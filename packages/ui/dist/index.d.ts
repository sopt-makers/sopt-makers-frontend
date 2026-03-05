import { ReactNode, ReactElement, FC } from 'react';

type LinkRenderer = (data: {
    href: string;
    children: ReactNode;
}) => ReactElement;
type PathMatcher = (path: string) => boolean;

interface DesktopHeaderProps {
    user: {
        id: string;
        name: string;
        image?: string;
    } | null;
    onLogout?: () => void;
    renderLink: LinkRenderer;
    activePathMatcher: PathMatcher;
}
declare const DesktopHeader: FC<DesktopHeaderProps>;

interface MobileHeaderProps {
    user: {
        id: string;
        name: string;
        image?: string;
    } | null;
    onLogout?: () => void;
    renderLink: LinkRenderer;
    activePathMatcher: PathMatcher;
}
declare const MobileHeader: FC<MobileHeaderProps>;

declare const playgroundLink: {
    memberList: () => string;
    teamLeaderList: () => string;
    memberDetail: (id: string | number) => string;
    memberUpload: () => string;
    memberEdit: () => string;
    memberCheckSoptActivity: () => string;
    projectList: () => string;
    projectDetail: (id: string | number) => string;
    projectUpload: () => string;
    projectEdit: (id: string | number) => string;
    groupList: () => string;
    groupDetail: (id: string | number) => string;
    intro: () => string;
    login: () => string;
    register: () => string;
    resetLogin: () => string;
    reconnectSocialAuth: () => string;
    connectSocialAuth: () => string;
    makers: () => string;
    blog: () => string;
    blogSuccess: () => string;
    mentoringDetail: (id: number) => string;
    wordchain: () => string;
    feedList: () => string;
    feedDetail: (id: string | number) => string;
    feedUpload: () => string;
    feedEdit: (id: string | number) => string;
    remember: () => string;
    coffeechatUpload: () => string;
    coffeechatEdit: (id: string | number) => string;
    coffeechat: () => string;
    coffeechatDetail: (id: string | number) => string;
    mySoptReport: () => string;
    accounts: () => string;
};

export { DesktopHeader, LinkRenderer, MobileHeader, PathMatcher, playgroundLink };
