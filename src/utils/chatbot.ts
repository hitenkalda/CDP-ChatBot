import { Platform } from '../types';

// Response format interface
interface ResponseFormat {
  title: string;
  content: string;
  note?: string;
  steps?: string[];
  links?: Array<{ text: string; url: string; }>;
}

// Helper functions
const formatResponse = (response: ResponseFormat): string => {
  const parts = [
    `## ${response.title}`,
    response.content
  ];

  if (response.steps?.length) {
    parts.push('\n### Steps:');
    response.steps.forEach((step, index) => {
      parts.push(`${index + 1}. ${step}`);
    });
  }

  if (response.links?.length) {
    parts.push('\n### Useful Links:');
    response.links.forEach(link => {
      parts.push(`- [${link.text}](${link.url})`);
    });
  }

  if (response.note) {
    parts.push(`\n> **Note:** ${response.note}`);
  }

  return parts.join('\n\n');
};

const isRelevantQuestion = (question: string): boolean => {
  const cdpKeywords = ['segment', 'mparticle', 'lytics', 'zeotap', 'cdp', 'data', 'profile', 'audience', 'integration'];
  return cdpKeywords.some(keyword => question.includes(keyword));
};

const detectPlatform = (question: string): Platform | null => {
  if (question.includes('segment')) return 'segment';
  if (question.includes('mparticle')) return 'mparticle';
  if (question.includes('lytics')) return 'lytics';
  if (question.includes('zeotap')) return 'zeotap';
  return null;
};

// Response generator functions
const getSetupResponse = (platform: Platform | null): string => {
  switch (platform) {
    case 'segment':
      return formatResponse({
        title: 'Setting up Segment',
        content: 'Here\'s how to set up a new source in Segment:',
        steps: [
          'Navigate to Connections > Sources in your Segment workspace',
          'Click "Add Source" button',
          'Choose your source type from the catalog',
          'Follow the configuration wizard',
          'Implement the provided tracking code in your application'
        ],
        links: [
          { text: 'Segment Documentation', url: 'https://segment.com/docs/' }
        ],
        note: 'Make sure to test your implementation in the Segment debugger before going live.'
      });
    // ... other cases
    default:
      return formatResponse({
        title: 'CDP Setup Guide',
        content: 'Which CDP platform would you like to set up?',
        note: 'Please specify which platform you\'re interested in.'
      });
  }
};

const getProfileCreationResponse = (platform: Platform | null): string => {
  switch (platform) {
    case 'segment':
      return formatResponse({
        title: 'Creating User Profiles in Segment',
        content: 'Here\'s how to create and manage user profiles in Segment:',
        steps: [
          'Implement identify() calls in your application',
          'Set user traits and properties',
          'Configure user trait mappings',
          'Enable Identity Resolution',
          'Verify profile creation in the debug tool'
        ],
        links: [
          { text: 'Identity Documentation', url: 'https://segment.com/docs/connections/spec/identify/' }
        ],
        note: 'Remember to include both anonymous and known user identification.'
      });
    // ... other cases
    default:
      return formatResponse({
        title: 'User Profile Creation',
        content: 'Please specify which CDP you\'re using.',
        note: 'Each platform has different approaches to identity management.'
      });
  }
};

const getAudienceSegmentationResponse = (platform: Platform | null): string => {
  // ... implementation
};

const getIntegrationResponse = (platform: Platform | null): string => {
  // ... implementation
};

// Main export
export const generateResponse = (question: string): string => {
  const normalizedQuestion = question.toLowerCase();
  
  if (!isRelevantQuestion(normalizedQuestion)) {
    return formatResponse({
      title: "I'm here to help with CDP questions",
      content: "I'm specifically designed to help with questions about Segment, mParticle, Lytics, and Zeotap. Could you please ask something related to these platforms?",
      note: "Try asking about setup, user profiles, audience segments, or integrations."
    });
  }

  const platform = detectPlatform(normalizedQuestion);
  
  if (normalizedQuestion.includes('set up') || normalizedQuestion.includes('setup')) {
    return getSetupResponse(platform);
  }
  
  if (normalizedQuestion.includes('create') && normalizedQuestion.includes('profile')) {
    return getProfileCreationResponse(platform);
  }
  
  if (normalizedQuestion.includes('segment') || normalizedQuestion.includes('audience')) {
    return getAudienceSegmentationResponse(platform);
  }
  
  if (normalizedQuestion.includes('integrate') || normalizedQuestion.includes('connection')) {
    return getIntegrationResponse(platform);
  }

  return formatResponse({
    title: `About ${platform || 'CDP'} Support`,
    content: "Could you please be more specific about what you'd like to know?",
    note: "You can ask about:\n- Platform setup\n- Creating user profiles\n- Building audience segments\n- Data integrations"
  });
};