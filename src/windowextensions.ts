export default interface IMyWindow extends Window {
    gapi: any;
    authorizeButton: HTMLElement | null;
    signoutButton: HTMLElement | null;
    //initClient() : void;
    //handleClientLoad() : void;
}
