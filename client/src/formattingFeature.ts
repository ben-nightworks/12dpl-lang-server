import { commands, ExtensionContext, TextEdit, window, workspace } from 'vscode';

export function registerFormattingFeatures(context: ExtensionContext) {
    context.subscriptions.push(
        workspace.onWillSaveTextDocument((event) => {
            if (event.document.languageId !== '12dpl') {
                return;
            }

            const config = workspace.getConfiguration('12dpl', event.document.uri);
            const enabled = config.get<boolean>('formatOnSave', true);
            if (!enabled) {
                return;
            }

            const indentSize = Number(config.get<number>('indentSize', 4));
            const preserveBlankLines = Boolean(config.get<boolean>('formatter.preserveBlankLines', false));
            const bracketStyle = config.get<string>('formatter.bracketStyle', 'preserve') as 'preserve' | 'same-line' | 'new-line';
            const maxLineLength = Number(config.get<number>('formatter.maxLineLength', 0));
            const indentStyle = config.get<string>('formatter.indentStyle', 'editor') as 'editor' | 'spaces' | 'tabs';
            const editorConfig = workspace.getConfiguration('editor', event.document.uri);
            // indentStyle overrides editor.insertSpaces when explicitly set to 'spaces' or 'tabs'.
            const editorInsertSpaces = Boolean(editorConfig.get<boolean>('insertSpaces', true));
            const insertSpaces = indentStyle === 'spaces' ? true
                : indentStyle === 'tabs' ? false
                : editorInsertSpaces;
            // Prefer 12dpl.indentSize; fall back to editor.tabSize so language-specific
            // tab size overrides (e.g. "[12dpl]": { "editor.tabSize": 2 }) are respected.
            const editorTabSize = Number(editorConfig.get<number>('tabSize', 4));
            const resolvedTabSize = Number.isFinite(indentSize) && indentSize > 0 ? indentSize : editorTabSize;

            const options = {
                tabSize: resolvedTabSize,
                insertSpaces,
                preserveBlankLines,
                bracketStyle,
                maxLineLength: Number.isFinite(maxLineLength) && maxLineLength > 0 ? maxLineLength : 0
            };

            event.waitUntil(
                commands
                    .executeCommand<TextEdit[]>('vscode.executeFormatDocumentProvider', event.document.uri, options)
                    .then((edits) => edits ?? [])
            );
        })
    );
}
