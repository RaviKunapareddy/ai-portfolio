interface PlausibleOptions {
  props?: Record<string, string | number>;
}

declare global {
  interface Window {
    plausible?: (event: string, options?: PlausibleOptions) => void;
  }
}

export const plausible = (event: string, options?: PlausibleOptions) => {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible(event, options);
  }
};

// Predefined events for the portfolio
export const trackEvent = {
  resumeDownload: () => {
    plausible('Resume Download');
  },
  
  projectCardClick: (project: string) => {
    plausible('Project Card Click', { props: { project } });
  },
  
  tryProjectClick: (project: string) => {
    plausible('Try Project Click', { props: { project } });
  },
  
  projectPreview: (project: string) => {
    plausible('Project Preview', { props: { project } });
  },
  
  projectSource: (project: string) => {
    plausible('Project Source', { props: { project } });
  },
  
  githubClick: () => {
    plausible('GitHub Click');
  },
  
  contactClick: () => {
    plausible('Contact Click');
  }
}; 