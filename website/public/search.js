/* ========================================
   12dPL Documentation Site - search.js
   Weighted token/phrase search scoring (issue #126).
   DOM-free so the ranking logic can run in both the
   browser (window.DocsSearch) and unit tests (module.exports).
   ======================================== */
(function (global) {
  'use strict';

  // Words that carry no search intent on their own. They are excluded from
  // token scoring but kept for phrase extraction so patterns such as
  // "to text" -> "_to_text" and "from model" still match.
  const STOP_WORDS = new Set([
    'a', 'an', 'the', 'to', 'for', 'of', 'or', 'and', 'how', 'do', 'i',
    'is', 'are', 'be', 'was', 'in', 'on', 'at', 'by', 'with', 'from', 'into',
    'it', 'its', 'my', 'me', 'you', 'your', 'that', 'this', 'these', 'those',
    'what', 'which', 'when', 'where', 'can', 'could', 'should', 'would',
    'will', 'please', 'before', 'after',
  ]);

  // Relative weight of a single token hit per field.
  const FIELD_WEIGHTS = { name: 5, signature: 2.5, description: 1.5, category: 0.75 };
  // Extra weight when a query token is the entire name (e.g. "print" -> Print).
  const WHOLE_NAME_BONUS = 6;
  // Phrase hits score per word of the phrase, so longer phrases rank higher.
  const PHRASE_WEIGHTS = { name: 16, signature: 6, description: 4 };
  // The whole query matching a name exactly ("real to text" -> Real_to_text).
  const EXACT_QUERY_BONUS = 40;
  // Results whose name shares nothing with the query are usually incidental
  // description matches, so they rank below any name hit of similar score.
  const NO_NAME_MATCH_PENALTY = 0.6;

  function tokenize(text) {
    return String(text || '').toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
  }

  function unique(list) {
    return Array.from(new Set(list));
  }

  // Meaningful query tokens: stop words removed, falling back to the raw
  // tokens when the query is nothing but stop words.
  function queryTerms(query) {
    const rawTokens = tokenize(query);
    const terms = unique(rawTokens.filter((tok) => !STOP_WORDS.has(tok)));
    return terms.length > 0 ? terms : unique(rawTokens);
  }

  // Token match quality: 1 for an exact token, 0.7 when a corpus token
  // extends the query token (prefix typing, "clip" -> "clipboard"), 0.6 when
  // the query token extends a corpus token (inflection, "elements" -> "element").
  function tokenMatch(term, tokens) {
    let best = 0;
    for (let i = 0; i < tokens.length; i++) {
      const tok = tokens[i];
      if (tok === term) return 1;
      if (best < 0.7 && term.length >= 2 && tok.length > term.length && tok.indexOf(term) === 0) {
        best = 0.7;
      } else if (best < 0.6 && tok.length >= 4 && term.length > tok.length && term.indexOf(tok) === 0) {
        best = 0.6;
      }
    }
    return best;
  }

  // 2- and 3-word phrases from the raw token sequence (stop words kept, so
  // "to text" survives) and from the meaningful sequence (stop words removed,
  // so "get id" is found inside "get the id"). Pure stop-word phrases are skipped.
  function extractPhrases(rawTokens, meaningfulTokens) {
    const phrases = new Map();
    function addFrom(tokens) {
      for (let size = 2; size <= 3; size++) {
        for (let i = 0; i + size <= tokens.length; i++) {
          const words = tokens.slice(i, i + size);
          if (words.every((w) => STOP_WORDS.has(w))) continue;
          const under = words.join('_');
          if (!phrases.has(under)) {
            phrases.set(under, { words, under, spaced: words.join(' ') });
          }
        }
      }
    }
    addFrom(rawTokens);
    addFrom(meaningfulTokens);
    return Array.from(phrases.values());
  }

  // Stop words in prose ("Get all THE elements FROM THE model") break naive
  // phrase matching, so phrases are also checked against a stripped rendering
  // of the signature and description with the stop words removed.
  function stripStopWords(text) {
    return tokenize(text).filter((tok) => !STOP_WORDS.has(tok)).join(' ');
  }

  // Entries need { name, signature, description, category }; any other
  // properties are carried through untouched on the returned results.
  function createSearchEngine(entries) {
    const docs = entries.map((entry) => ({
      entry,
      nameNorm: String(entry.name || '').toLowerCase(),
      nameTokens: unique(tokenize(entry.name)),
      sigNorm: String(entry.signature || '').toLowerCase(),
      sigTokens: unique(tokenize(entry.signature)),
      sigStripped: stripStopWords(entry.signature),
      descNorm: String(entry.description || '').toLowerCase(),
      descTokens: unique(tokenize(entry.description)),
      descStripped: stripStopWords(entry.description),
      catNorm: String(entry.category || '').toLowerCase(),
    }));

    // Document frequency, used to down-weight generic tokens ("text",
    // "integer", "window", ...) so they cannot dominate the ranking.
    const docFreq = new Map();
    docs.forEach((doc) => {
      unique(doc.nameTokens.concat(doc.sigTokens, doc.descTokens)).forEach((tok) => {
        docFreq.set(tok, (docFreq.get(tok) || 0) + 1);
      });
    });

    function idf(term) {
      const df = docFreq.get(term) || 1;
      return Math.log(1 + docs.length / df);
    }

    function scoreDoc(doc, terms, phrases, queryUnder) {
      let score = 0;
      let matched = 0;
      let nameHit = false;

      for (let i = 0; i < terms.length; i++) {
        const term = terms[i];
        let best = FIELD_WEIGHTS.name * tokenMatch(term, doc.nameTokens);
        if (best > 0) nameHit = true;
        if (term === doc.nameNorm) best += WHOLE_NAME_BONUS;
        best = Math.max(best, FIELD_WEIGHTS.signature * tokenMatch(term, doc.sigTokens));
        best = Math.max(best, FIELD_WEIGHTS.description * tokenMatch(term, doc.descTokens));
        if (best === 0 && doc.catNorm !== '' && doc.catNorm === term) {
          best = FIELD_WEIGHTS.category;
        }
        if (best > 0) {
          matched += 1;
          score += best * idf(term);
        }
      }

      // Require enough token coverage before returning a result, so one
      // generic hit ("convert") cannot qualify a long natural-language query.
      const required = terms.length <= 2 ? 1 : Math.min(3, Math.ceil(terms.length / 2));
      if (matched < required) return 0;

      for (let i = 0; i < phrases.length; i++) {
        const phrase = phrases[i];
        const words = phrase.words.length;
        if (doc.nameNorm.indexOf(phrase.under) !== -1 || doc.nameNorm.indexOf(phrase.spaced) !== -1) {
          score += PHRASE_WEIGHTS.name * words;
          nameHit = true;
        } else if (doc.sigNorm.indexOf(phrase.spaced) !== -1 || doc.sigNorm.indexOf(phrase.under) !== -1 ||
                   doc.sigStripped.indexOf(phrase.spaced) !== -1) {
          score += PHRASE_WEIGHTS.signature * words;
        } else if (doc.descNorm.indexOf(phrase.spaced) !== -1 ||
                   doc.descStripped.indexOf(phrase.spaced) !== -1) {
          score += PHRASE_WEIGHTS.description * words;
        }
      }

      if (queryUnder && doc.nameNorm === queryUnder) {
        score += EXACT_QUERY_BONUS;
        nameHit = true;
      }
      if (!nameHit) score *= NO_NAME_MATCH_PENALTY;

      // Scale by coverage so results matching more of the query rank higher.
      return score * (0.5 + 0.5 * (matched / terms.length));
    }

    function search(query, limit) {
      const qNorm = String(query || '').trim().toLowerCase();
      const rawTokens = tokenize(qNorm);
      if (rawTokens.length === 0) return [];
      const meaningfulTokens = rawTokens.filter((tok) => !STOP_WORDS.has(tok));
      let terms = unique(meaningfulTokens);
      if (terms.length === 0) terms = unique(rawTokens);
      const phrases = extractPhrases(rawTokens, meaningfulTokens);
      const queryUnder = rawTokens.join('_');

      const results = [];
      for (let i = 0; i < docs.length; i++) {
        const score = scoreDoc(docs[i], terms, phrases, queryUnder);
        if (score > 0) results.push({ entry: docs[i].entry, score, nameNorm: docs[i].nameNorm });
      }
      results.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        const aPrefix = a.nameNorm.indexOf(qNorm) === 0 ? 0 : 1;
        const bPrefix = b.nameNorm.indexOf(qNorm) === 0 ? 0 : 1;
        if (aPrefix !== bPrefix) return aPrefix - bPrefix;
        if (a.nameNorm.length !== b.nameNorm.length) return a.nameNorm.length - b.nameNorm.length;
        return a.nameNorm < b.nameNorm ? -1 : a.nameNorm > b.nameNorm ? 1 : 0;
      });
      return results.slice(0, limit || 14).map((r) => ({ entry: r.entry, score: r.score }));
    }

    return { search };
  }

  const DocsSearch = { tokenize, queryTerms, createSearchEngine, STOP_WORDS };
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = DocsSearch;
  }
  global.DocsSearch = DocsSearch;
})(typeof window !== 'undefined' ? window : globalThis);
