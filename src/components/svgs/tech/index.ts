import { type FC } from 'react';
import { type SVGIconProps } from '..';
import IconAdobeIllustrator from './IconAdobeIllustrator';
import IconBrandNext from './IconBrandNext';
import IconConfluence from './IconConfluence';
import IconCss from './IconCss';
import IconFigma from './IconFigma';
import IconFramer from './IconFramer';
import IconGatsby from './IconGatsby';
import IconGit from './IconGit';
import { IconGitHubAlt } from '../socials';
import IconHtml from './IconHtml';
import IconJavascript from './IconJavascript';
import IconJira from './IconJira';
import IconMantine from './IconMantine';
import IconMongodb from './IconMongodb';
import IconNodeJs from './IconNodeJs';
import IconPrisma from './IconPrisma';
import IconReact from './IconReact';
import IconReactHookForm from './IconReactHookForm';
import IconRedux from './IconRedux';
import IconTailwind from './IconTailwind';
import IconTrpc from './IconTrpc';
import IconTypescript from './IconTypescript';
import IconVsCode from './IconVsCode';

export type TechIconItem = {
  id: string;
  Icon: FC<SVGIconProps>;
};

const techIcons: TechIconItem[] = [
  {
    id: 'Git',
    Icon: IconGit,
  },
  {
    id: 'GitHub',
    Icon: IconGitHubAlt,
  },
  {
    id: 'Jira',
    Icon: IconJira,
  },
  {
    id: 'Confluence',
    Icon: IconConfluence,
  },
  {
    id: 'VS Code',
    Icon: IconVsCode,
  },
  {
    id: 'Next JS',
    Icon: IconBrandNext,
  },
  {
    id: 'TypeScript',
    Icon: IconTypescript,
  },
  {
    id: 'TailwindCSS',
    Icon: IconTailwind,
  },
  {
    id: 'Framer',
    Icon: IconFramer,
  },
  {
    id: 'Hook Forms',
    Icon: IconReactHookForm,
  },
  {
    id: 'React',
    Icon: IconReact,
  },
  {
    id: 'Redux',
    Icon: IconRedux,
  },
  {
    id: 'MantineUI',
    Icon: IconMantine,
  },
  {
    id: 'HTML5',
    Icon: IconHtml,
  },
  {
    id: 'CSS3',
    Icon: IconCss,
  },
  {
    id: 'JavaScript',
    Icon: IconJavascript,
  },
  {
    id: 'GatsbyJS',
    Icon: IconGatsby,
  },
  {
    id: 'NodeJS',
    Icon: IconNodeJs,
  },
  {
    id: 'MongoDB',
    Icon: IconMongodb,
  },
  {
    id: 'Prisma',
    Icon: IconPrisma,
  },
  {
    id: 'tRPC',
    Icon: IconTrpc,
  },
  {
    id: 'Illustrator',
    Icon: IconAdobeIllustrator,
  },
  {
    id: 'Figma',
    Icon: IconFigma,
  },
];

export default techIcons;
