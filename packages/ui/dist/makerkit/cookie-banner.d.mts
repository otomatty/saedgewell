import * as React from 'react';

declare enum ConsentStatus {
    Accepted = "accepted",
    Rejected = "rejected",
    Unknown = "unknown"
}
declare function CookieBanner(): React.JSX.Element | null;
declare function useCookieConsent(): {
    clear: () => void;
    status: ConsentStatus;
    accept: () => void;
    reject: () => void;
};

export { CookieBanner, useCookieConsent };
