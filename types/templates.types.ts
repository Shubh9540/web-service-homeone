export interface HeaderContactItem {
  id: string;
  icon: string;
  label: string;
  value: string;
}

export interface HeaderNavLink {
  id: string;
  label: string;
  url: string;
}

export interface HeaderData {
  logo: string;
  logoAlt: string;
  contactInfoLeft: HeaderContactItem[];
  contactInfoRight: HeaderContactItem[];
  navLinksLeft: HeaderNavLink[];
  navLinksRight: HeaderNavLink[];
  contactButton: { text: string; url: string };
}


export interface HeroSlide {
  id: string;
  subtitle: string;
  title1: string;
  title2: string;
  description: string;
  image: string;
  primaryButton: { text: string; url: string };
  secondaryButton?: { text: string; url: string };
}

export interface HeroData {
  subtitle: string;
  title1: string;
  title2: string;
  title3: string;
  description: string;
  image1: string;
  image2: string;
  image3: string;
  button: { text: string; url: string };
  slides?: HeroSlide[];
  nextSlideLabel: string;
  previousSlideLabel: string;
  goToSlideLabel: string;
}

export interface AboutUsData {
  subtitle: string;
  subtitlePrefix: string;
  title1: string;
  title2: string;
  description: string;
  features: { id: string; icon: string; title: string; description?: string }[];
  checklists?: string[];
  avatars?: string[];
  customersText?: string;
  videoThumbnail?: string;
  videoUrl?: string;
  videoText?: string;
  videoSubtext?: string;
  button: { text: string; url: string };
  bgImage?: string;
  imageMain: string;
  imageSmall1?: string;
  imageSmall2: string;
  badgeText1?: string;
  badgeText2?: string;
  imageMainAlt: string;
  imageSmallAlt: string;
  watermarkText: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: string;
  url: string;
}

export interface ServicesData {
  subtitle: string;
  title1: string;
  title2: string;
  description: string;
  services: ServiceItem[];
  button: { text: string; url: string };
  readMoreText: string;
}

export interface PortfolioFeature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface PortfolioCategory {
  id: string;
  icon: string;
  label: string;
  subtitle: string;
  title: string;
  description: string;
  features: PortfolioFeature[];
  sliderImages: string[];
  fixedImage: string;
  button: {
    text: string;
    url: string;
  };
}

export interface PortfolioData {
  subtitle: string;
  title1: string;
  title2: string;
  categories: PortfolioCategory[];
  previousSlideLabel: string;
  nextSlideLabel: string;
}

export interface GalleryItem {
  id: string;
  image: string;
  alt: string;
}

export interface GalleryData {
  subtitle: string;
  title1: string;
  title2: string;
  description: string;
  images: GalleryItem[];
  button?: { text: string; url: string };
}

export interface CounterItem {
  id: string;
  icon: string;
  number: string;
  label: string;
}

export interface CounterData {
  items: CounterItem[];
}

export interface ProcessItem {
  id: string;
  icon: string;
  number: string;
  title: string;
  description: string;
}

export interface ProcessData {
  subtitle: string;
  title1: string;
  title2: string;
  description?: string;
  bgImage: string;
  steps: ProcessItem[];
}

export interface TechnologyItem {
  id: string;
  title: string;
  image: string;
}

export interface TechnologiesData {
  subtitle: string;
  title1: string;
  title2: string;
  description: string;
  items: TechnologyItem[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
  avatar: string;
}

export interface TestimonialsData {
  subtitle: string;
  title1: string;
  title2: string;
  description: string;
  testimonials: TestimonialItem[];
  quoteMark: string;
}

export interface ContactData {
  subtitle: string;
  title1: string;
  title2: string;
  description: string;
  contactInfo: {
    phoneTitle: string;
    phone: string;
    emailTitle: string;
    email: string;
    addressTitle: string;
    address: string;
  };
  image: string;
  imageAlt: string;
  mapUrl: string;
  form: {
    subtitle: string;
    title: string;
    titleHighlight: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    subjectPlaceholder: string;
    phonePlaceholder: string;
    messagePlaceholder: string;
    buttonText: string;
  };
}

export interface FooterData {
  logo: string;
  logoAlt: string;
  brandTitle: string;
  copyrightText: string;
  description: string;
  hoursTitle: string;
  hours: string;
  hoursDays: string;
  socialLinks: { id: string; icon: string; url: string }[];
  quickLinks: { id: string; label: string; url: string }[];
  servicesLinks: { id: string; label: string; url: string }[];
  contactInfo: { address: string; phone: string; email: string };
  instagram: string[];
  quickLinksTitle: string;
  servicesTitle: string;
  contactTitle: string;
  scrollTopLabel: string;
}

export interface NotFoundData {
  code: string;
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
}

export interface GlobalUIData {
  notFound: NotFoundData;
}

export interface SiteMetadataData {
  title: string;
  description: string;
  icon: string;
}

export interface TemplateComponentEntry {
  key: string;
  component: string;
}

export interface TemplateComponentsData {
  shared: Record<string, string>;
  pages: Record<string, { components: TemplateComponentEntry[] }>;
}

export interface PageRegistryItem {
  route?: string;
  components: string[];
}

export interface WebserviceTemplateData {
  common: {
    siteMetadata: SiteMetadataData;
    globalUI: GlobalUIData;
    Footer: FooterData;
  };
  categories: {
    Webservice: {
      templateComponents?: TemplateComponentsData;
      sections: {
        Header?: { variants?: { WebserviceHeader2?: HeaderData } };
        Hero?: { variants?: { WebserviceHero2?: HeroData } };
        AboutUs?: { variants?: { WebserviceAboutUs2?: AboutUsData } };
        Services?: { variants?: { WebserviceServices2?: ServicesData } };
        Process?: { variants?: { WebserviceProcess2?: ProcessData } };
        Testimonials?: { variants?: { WebserviceTestimonials2?: TestimonialsData } };
        Portfolio?: { variants?: { WebservicePortfolio2?: PortfolioData } };
        Counter?: { variants?: { WebserviceCounter2?: CounterData } };
        Technologies?: { variants?: { WebserviceTechnologies2?: TechnologiesData } };
        Gallery?: { variants?: { WebserviceGallery2?: GalleryData } };
        Contact?: { variants?: { WebserviceContact2?: ContactData } };
      };
    };
  };
  pages: Record<string, PageRegistryItem>;
}
