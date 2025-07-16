import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center">
                <AppLogoIcon className="size-5 text-current" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-base">
                <span className="truncate leading-tight font-semibold">Pandu Inventoriku</span>
            </div>
        </>
    );
}
