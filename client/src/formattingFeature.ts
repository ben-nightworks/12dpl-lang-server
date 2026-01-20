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
            const editorConfig = workspace.getConfiguration('editor', event.document.uri);
            const insertSpaces = Boolean(editorConfig.get<boolean>('insertSpaces', true));

            const options = {
                tabSize: Number.isFinite(indentSize) && indentSize > 0 ? indentSize : 4,
                insertSpaces
            };

            event.waitUntil(
                commands
                    .executeCommand<TextEdit[]>('vscode.executeFormatDocumentProvider', event.document.uri, options)
                    .then((edits) => edits ?? [])
            );
        })
    );
}
