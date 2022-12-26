
import { lstatSync, writeFile } from 'fs';
import * as vscode from 'vscode';

export default async function newShortCutUrl(args: vscode.Uri | undefined) {
    let folderPath: string | undefined = undefined;
    if (args === undefined) {
        folderPath = vscode.workspace.rootPath;
    } else {
        folderPath = args.fsPath;
    }
    if (folderPath === undefined) { return; }
    if (!lstatSync(folderPath).isDirectory()) {
        return;
    }

    let fileName: string | undefined = await vscode.window.showInputBox();
    if (fileName === undefined || fileName === "") {
        return;
    }

    let filePath = folderPath + "/" + fileName + ".url";

    let url: string | undefined = await vscode.window.showInputBox();
    if (url === undefined || url === "") {
        return;
    }

    let text: string = "[InternetShortcut]\nIDList=\nURL=" + url;

    writeFile(filePath, text, err => {
        if (err) {
            vscode.window.showErrorMessage(err.message);
        }
    });

}
