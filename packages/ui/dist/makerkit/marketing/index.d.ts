import * as React$1 from 'react';
import React__default from 'react';
import { Button } from '../../shadcn/button.js';
import { z } from 'zod';
import 'class-variance-authority/types';
import 'class-variance-authority';

declare const HeroTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement> & {
    asChild?: boolean;
}>;

declare const Pill: React.FC<React.HTMLAttributes<HTMLHeadingElement> & {
    label?: string;
    asChild?: boolean;
}>;
declare const PillActionButton: React.FC<React.HTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
}>;

declare const GradientSecondaryText: React.FC<React.HTMLAttributes<HTMLSpanElement> & {
    asChild?: boolean;
}>;

declare const GradientText: React__default.FC<React__default.HTMLAttributes<HTMLSpanElement>>;

interface HeroProps {
    pill?: React__default.ReactNode;
    title: React__default.ReactNode;
    subtitle?: React__default.ReactNode;
    cta?: React__default.ReactNode;
    image?: React__default.ReactNode;
    className?: string;
    animate?: boolean;
}
declare function Hero({ pill, title, subtitle, cta, image, className, animate, }: HeroProps): React__default.JSX.Element;

interface SecondaryHeroProps extends React.HTMLAttributes<HTMLDivElement> {
    pill?: React.ReactNode;
    heading: React.ReactNode;
    subheading: React.ReactNode;
}
declare const SecondaryHero: React.FC<SecondaryHeroProps>;

declare const CtaButton: React.FC<React.ComponentProps<typeof Button>>;

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    logo?: React.ReactNode;
    navigation?: React.ReactNode;
    actions?: React.ReactNode;
}
declare const Header: React.FC<HeaderProps>;

interface FooterSection {
    heading: React.ReactNode;
    links: Array<{
        href: string;
        label: React.ReactNode;
    }>;
}
interface FooterProps extends React.HTMLAttributes<HTMLElement> {
    logo: React.ReactNode;
    description: React.ReactNode;
    copyright: React.ReactNode;
    sections: FooterSection[];
}
declare const Footer: React.FC<FooterProps>;

interface FeatureShowcaseProps extends React__default.HTMLAttributes<HTMLDivElement> {
    heading: React__default.ReactNode;
    icon?: React__default.ReactNode;
}
declare const FeatureShowcase: React__default.FC<FeatureShowcaseProps>;
declare function FeatureShowcaseIconContainer(props: React__default.PropsWithChildren<{
    className?: string;
}>): React__default.JSX.Element;

declare const FeatureGrid: React__default.FC<React__default.HTMLAttributes<HTMLDivElement>>;

interface FeatureCardProps extends React__default.HTMLAttributes<HTMLDivElement> {
    label: string;
    description: string;
}
declare const FeatureCard: React__default.FC<FeatureCardProps>;

declare const NewsletterFormSchema: z.ZodObject<{
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
}, {
    email: string;
}>;
type NewsletterFormValues = z.infer<typeof NewsletterFormSchema>;
interface NewsletterSignupProps extends React.HTMLAttributes<HTMLDivElement> {
    onSignup: (data: NewsletterFormValues) => void;
    buttonText?: string;
    placeholder?: string;
}
declare function NewsletterSignup({ onSignup, buttonText, placeholder, className, ...props }: NewsletterSignupProps): React$1.JSX.Element;

interface NewsletterSignupContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    onSignup: (email: string) => Promise<void>;
    heading?: string;
    description?: string;
    successMessage?: string;
    errorMessage?: string;
}
declare function NewsletterSignupContainer({ onSignup, heading, description, successMessage, errorMessage, className, ...props }: NewsletterSignupContainerProps): React$1.JSX.Element;

declare const ComingSoonHeading: React__default.FC<React__default.HTMLAttributes<HTMLHeadingElement>>;
declare const ComingSoonText: React__default.FC<React__default.HTMLAttributes<HTMLParagraphElement>>;
declare const ComingSoonButton: React__default.FC<React__default.ComponentPropsWithoutRef<typeof Button>>;
declare const ComingSoon: React__default.FC<React__default.HTMLAttributes<HTMLDivElement>>;
declare const ComingSoonLogo: React__default.FC<React__default.HTMLAttributes<HTMLImageElement>>;

export { ComingSoon, ComingSoonButton, ComingSoonHeading, ComingSoonLogo, ComingSoonText, CtaButton, FeatureCard, FeatureGrid, FeatureShowcase, FeatureShowcaseIconContainer, Footer, GradientSecondaryText, GradientText, Header, Hero, HeroTitle, NewsletterSignup, NewsletterSignupContainer, Pill, PillActionButton, SecondaryHero };
