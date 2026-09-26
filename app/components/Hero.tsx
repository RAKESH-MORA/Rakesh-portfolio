'use client';
import Reveal from './Reveal';

// ── All logos: AI companies + skill tech ──────────────────────────────────────
const ALL_LOGOS = [
  {
    name: 'OpenAI',
    color: '#10a37f',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%"><path d="M12 2a10 10 0 1 0 7.07 17.07A10 10 0 0 0 12 2zm0 3a7 7 0 0 1 5.8 3.08l-2.16 1.25A4.5 4.5 0 0 0 8.1 8.08L6 6.87A7 7 0 0 1 12 5zm-6.06 4.2 2.17 1.25a4.5 4.5 0 0 0 4.38 5.64v2.5A7 7 0 0 1 5.94 9.2zm4.75 9.14v-2.5a4.5 4.5 0 0 0 4.38-5.64l2.17-1.25a7 7 0 0 1-6.55 9.39z"/></svg>,
  },
  {
    name: 'Anthropic',
    color: '#c96442',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%"><path d="M12 3 22 21h-4.2l-2.1-4H8.3l-2.1 4H2L12 3zm0 6.8-2.1 4h4.2l-2.1-4z"/></svg>,
  },
  {
    name: 'Google',
    color: '#4285F4',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>,
  },
  {
    name: 'Meta AI',
    color: '#0082FB',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%"><path d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.186.324.37.648.557.972l1.018 1.799c1.389 2.454 2.028 3.512 2.973 4.596C17.506 19.537 18.44 20 19.986 20c1.476 0 2.556-.611 3.317-1.861.24-.386.43-.836.579-1.349.148-.514.216-1.071.216-1.662 0-2.569-.643-5.173-1.993-7.358C20.589 5.484 18.895 4.03 17.055 4.03c-1.613 0-2.681.659-3.965 2.19a21.3 21.3 0 0 0-.333.42c-.195-.266-.388-.534-.582-.79C10.895 4.42 9.913 4.03 8.915 4.03H6.915zm5.048 7.43c-.96 1.655-1.737 2.88-2.322 3.682-1.164 1.578-2.02 2.152-3.099 2.152-1.08 0-1.89-.48-2.405-1.348a4.66 4.66 0 0 1-.407-1.338 9.8 9.8 0 0 1-.12-1.543c0-2.206.617-4.513 1.63-6.056.804-1.24 1.86-2.03 2.95-2.03h2c.833 0 1.55.396 2.164 1.192.195.256.388.536.579.832l-.97 1.457zm3.563-3.72c1.093 0 2.19.8 3.03 2.209C19.68 11.503 20.25 13.6 20.25 15.5c0 .514-.063.98-.19 1.396a3.437 3.437 0 0 1-.379.875c-.51.82-1.24 1.23-2.198 1.23-1.044 0-1.764-.498-2.714-1.674-.754-.92-1.452-2.086-2.752-4.351l-.957-1.71.994-1.52c1.145-1.716 2.11-2.466 3.062-2.466l.4.013z"/></svg>,
  },
  {
    name: 'Microsoft',
    color: '#00adef',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%"><path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z"/></svg>,
  },
  {
    name: 'Mistral AI',
    color: '#f9a01b',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%"><path d="M0 0h3.429v3.429H0zm3.429 0h3.429v3.429H3.43zm13.714 0H20.57v3.429h-3.428zM20.57 0H24v3.429h-3.43zM0 3.429h3.429v3.428H0zm17.143 0H20.57v3.428h-3.428zm3.428 0H24v3.428h-3.43zM0 6.857h3.429v3.429H0zm3.429 0h3.429v3.429H3.43zm3.428 0h3.429v3.429H6.857zm3.429 0h3.428v3.429H10.286zm3.428 0h3.429v3.429h-3.429zm3.429 0H20.57v3.429h-3.428zm3.428 0H24v3.429h-3.43zM0 10.286h3.429v3.428H0zm3.429 0h3.429v3.428H3.43zm3.428 0h3.429v3.428H6.857zm3.429 0h3.428v3.428H10.286zm3.428 0h3.429v3.428h-3.429zm3.429 0H20.57v3.428h-3.428zm3.428 0H24v3.428h-3.43zM0 13.714h3.429v3.429H0zm3.429 0h3.429v3.429H3.43zm17.142 0H24v3.429h-3.43zM0 17.143h3.429v3.428H0zm20.571 0H24v3.428h-3.43zM0 20.57h3.429V24H0zm3.429 0h3.429V24H3.43zm13.714 0H20.57V24h-3.428zm3.428 0H24V24h-3.43z"/></svg>,
  },
  {
    name: 'SQL',
    color: '#888888',
    svg:
    <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
      <path d="M12 3C7.589 3 4 4.343 4 6v12c0 1.657 3.589 3 8 3s8-1.343 8-3V6c0-1.657-3.589-3-8-3zm0 2c3.866 0 6 1.007 6 1.5S15.866 8 12 8 6 6.993 6 6.5 8.134 5 12 5zm6 13c0 .493-2.134 1.5-6 1.5s-6-1.007-6-1.5v-1.893C7.472 16.823 9.67 17 12 17s4.528-.177 6-1.393V18zm0-4c0 .493-2.134 1.5-6 1.5s-6-1.007-6-1.5v-1.893C7.472 12.823 9.67 13 12 13s4.528-.177 6-1.393V14zm0-4c0 .493-2.134 1.5-6 1.5S6 10.493 6 10V8.107C7.472 9.177 9.67 9.5 12 9.5s4.528-.323 6-1.393V10z"/>
    </svg>
  },
  {
    name: 'Java',
    color: '#007396',
    svg:
    <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
      <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639"/>
    </svg>
  },
  {
    name: 'xAI / Grok',
    color: '#888888',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%"><path d="M17.553 5.431L7.948 18.817H6.353l9.6-13.385h1.6zM16.55 18.817l-4.6-6.523 1-.818 5.15 7.341h-1.55zM7.25 5.43l4.6 6.524-1 .818L5.7 5.431H7.25z"/></svg>,
  },
  {
    name: 'Perplexity',
    color: '#18a7ba',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%"><path d="M9.535 3.205v4.678L5.042 3.205H2.5l5.498 6.17H2.5v1.25h5.498L2.5 16.795h2.542l4.493-4.678v4.678h1.25V12.12l4.494 4.677h2.541l-5.498-6.17H17.5v-1.25h-5.498l5.498-6.17h-2.541l-4.494 4.678V3.205h-1.25z"/></svg>,
  },
  {
    name: 'GitHub',
    color: '#888888',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>,
  },
  {
    name: 'React',
    color: '#61DAFB',
    svg: <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%"><circle cx="12" cy="12" r="2.139" fill="#61DAFB"/><ellipse cx="12" cy="12" rx="10.5" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none"/><ellipse cx="12" cy="12" rx="10.5" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10.5" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)"/></svg>,
  },
  {
    name: 'Next.js',
    color: '#888888',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%"><path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z"/></svg>,
  },
  {
    name: 'Node.js',
    color: '#339933',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%"><path d="M11.998 24a1.362 1.362 0 0 1-.681-.18l-2.162-1.278c-.323-.181-.165-.244-.059-.281.43-.15.517-.184.977-.444a.17.17 0 0 1 .162.013l1.661.986c.06.033.144.033.2 0l6.479-3.739c.06-.034.099-.103.099-.174V7.408c0-.073-.04-.14-.1-.175l-6.478-3.737a.18.18 0 0 0-.199 0L5.42 7.233c-.061.035-.1.103-.1.175v7.477c0 .07.04.14.1.173l1.775 1.025c.964.482 1.554-.086 1.554-.658V8.184c0-.105.084-.188.188-.188h.82c.103 0 .188.083.188.188v6.929c0 1.289-.702 2.028-1.924 2.028-.376 0-.672 0-1.498-.407L4.59 15.787a1.363 1.363 0 0 1-.68-1.18V7.129c0-.487.26-.939.681-1.18l6.479-3.742a1.42 1.42 0 0 1 1.361 0l6.479 3.742c.42.241.68.693.68 1.18v7.478c0 .487-.26.938-.68 1.18l-6.479 3.742a1.364 1.364 0 0 1-.682.18z"/></svg>,
  },
  {
    name: 'TypeScript',
    color: '#3178C6',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/></svg>,
  },
  {
    name: 'Python',
    color: '#3776AB',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%"><path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/></svg>,
  },
  {
    name: 'Git',
    color: '#F05032',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%"><path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/></svg>,
  },
  {
    name: 'Firebase',
    color: '#FFCA28',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%"><path d="M3.89 15.672L6.255.461A.542.542 0 0 1 7.27.288l2.543 4.771zm16.794 3.692l-2.25-14a.54.54 0 0 0-.919-.295L3.316 19.365l7.856 4.427a1.621 1.621 0 0 0 1.588 0zM14.3 7.148l-1.82-3.482a.542.542 0 0 0-.96 0L3.53 17.984z"/></svg>,
  },
  {
    name: 'Vercel',
    color: '#888888',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%"><path d="M24 22.525H0l12-21.05 12 21.05z"/></svg>,
  },
  {
    name: 'Tailwind',
    color: '#06B6D4',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/></svg>,
  },
  {
    name: 'Figma',
    color: '#F24E1E',
    svg: <svg viewBox="0 0 24 24" width="100%" height="100%"><path fill="#F24E1E" d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4z"/><path fill="#FF7262" d="M4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4z"/><path fill="#A259FF" d="M4 4c0-2.208 1.792-4 4-4h4v8H8C5.792 8 4 6.208 4 4z"/><path fill="#1ABCFE" d="M12 0h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0z"/><path fill="#0ACF83" d="M20 12c0 2.208-1.792 4-4 4s-4-1.792-4-4 1.792-4 4-4 4 1.792 4 4z"/></svg>,
  },
  {
    name: 'Supabase',
    color: '#3ECF8E',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%"><path d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C-.33 13.427.65 15.455 2.409 15.455h9.579l.003 7.51c.015.985 1.26 1.408 1.873.636l9.262-11.653c1.093-1.375.113-3.403-1.645-3.403h-9.58L11.9 1.036z"/></svg>,
  },
  {
    name: 'VS Code',
    color: '#007ACC',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%"><path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/></svg>,
  },
  {
    name: 'HTML5',
    color:'#E34F26',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>
    </svg>
  },
  {
    name: 'CSS3',
    color: '#1572B6',
    svg: 
    <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/>
    </svg>
  },
  {
    name: 'Express.js',
    color: '#888888',
    svg:
    <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
      <path d="M24 18.588a1.529 1.529 0 0 1-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 0 1-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 0 1 1.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 0 1 1.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 0 0 0 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 0 0 2.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 0 1-2.589 3.957 6.272 6.272 0 0 1-7.306-.933 6.575 6.575 0 0 1-1.64-3.858c-.013-.092-.032-.182-.048-.273-.003-1.511-.003-1.51-.003-2.553zm1.114-.228h9.666c-.064-3.172-2.139-5.405-4.6-5.38-2.64.05-4.987 2.472-5.066 5.38z"/>
    </svg>
  },
  {
    name: 'Django',
    color: '#092E20',
    svg:
    <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
      <path d="M11.146 0h3.924v18.165c-2.013.382-3.491.535-5.096.535-4.791 0-7.288-2.166-7.288-6.32 0-4.002 2.65-6.6 6.753-6.6.637 0 1.121.05 1.707.204V0zm0 9.143a3.894 3.894 0 0 0-1.325-.204c-1.988 0-3.134 1.223-3.134 3.365 0 2.09 1.096 3.236 3.109 3.236.433 0 .79-.025 1.35-.102V9.142zM21.314 6.06v11.096c0 3.849-.28 5.704-1.096 7.305-.765 1.55-1.783 2.523-3.875 3.594l-3.645-1.731c2.09-1.071 3.108-1.97 3.747-3.391.664-1.45.893-3.16.893-7.687V6.061h3.976zM17.338 0h3.976v4.012h-3.976V0z"/>
    </svg>
  },
  {
    name: 'JavaScript',
    color: '#F7DF1E',
    svg:
    <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
      <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
    </svg>
  },
  {
    name: 'PostgreSQL',
    color: '#336791',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%"><path d="M17.128 0a10.134 10.134 0 0 0-2.755.403 5.834 5.834 0 0 0-.563-.094c-1.17-.155-2.163.053-2.944.474C9.678.27 7.56.017 5.69.777 2.36 2.1.395 5.568.395 8.57c0 2.237.81 3.68 2.041 3.751.657.038 1.29-.388 1.823-1.264.935 3.912 3.403 6.918 6.047 6.918.708 0 1.388-.318 2.003-.894.703.691 1.45 1.055 2.243 1.055 2.714 0 5.013-3.37 5.788-7.512l.052-.028c.686-.369 1.088-1.195 1.088-2.31 0-.812-.195-1.773-.604-2.86 1.352-1.048 2.118-2.655 2.118-4.82 0-.379-.026-.67-.06-.901-.124-.812-.578-1.23-1.07-1.3C21.58.27 21.13.16 20.63.102A7.24 7.24 0 0 0 17.128 0z"/></svg>,
  },
  {
    name: 'MongoDB',
    color: '#47A248',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%"><path d="M17.193 9.555c-1.264-5.58-4.252-7.243-4.599-8.055-.345-.77-.54-1.57-.54-1.57s-.11.525-.27.904c-.162.378-.37.73-.538 1.02-.47.79-2.31 3.18-2.77 5.92-.39 2.26-.25 4.63.52 6.65.77 2.02 1.67 3.51 2.77 4.88l.01.02c.29.38.6.75.91 1.15.32.4.64.81.95 1.24.08.11.15.21.22.31l.49.66c.1.16.33.43.49.66.05.08.1.16.14.23l.04.06.06.1c.04.07.07.13.1.19.03.07.06.14.09.22.02.07.04.14.06.22.01.04.02.09.03.13.01.05.02.09.02.14.01.05.01.1.01.15 0 .06 0 .11-.01.17 0 .06-.01.12-.02.17-.02.1-.04.2-.07.29-.06.18-.13.35-.22.51-.18.33-.41.62-.69.89a4.26 4.26 0 0 1-.45.38l-.06.05c-.22.16-.46.3-.71.42-.25.12-.51.21-.78.28-.14.04-.27.06-.41.08-.14.02-.28.03-.43.03-.14 0-.28-.01-.42-.03-.28-.04-.55-.11-.82-.2a4.94 4.94 0 0 1-.76-.35 5.87 5.87 0 0 1-.67-.44 6.37 6.37 0 0 1-.3-.24l-.07-.06c-.22-.19-.43-.4-.62-.63a6.18 6.18 0 0 1-.52-.71c-.16-.25-.3-.51-.43-.79-.13-.27-.24-.56-.33-.85a7.49 7.49 0 0 1-.22-.91c-.06-.31-.09-.63-.11-.95-.02-.32-.02-.64 0-.96.01-.32.05-.64.09-.96.05-.32.11-.63.19-.94.07-.3.17-.6.27-.89.2-.57.47-1.12.79-1.63.65-1.02 1.53-1.88 2.56-2.5.48-.29.99-.52 1.52-.69.53-.17 1.08-.27 1.64-.31.27-.02.55-.02.82 0z"/></svg>,
  },
  {
    name: 'Flutter',
    color: '#02569B',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%"><path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.37zm.159 11.871l-4.2 4.2 4.2 4.2 4.2-4.2-4.2-4.2zM6.3 19.757l4.204 4.2 4.2-4.2-4.2-4.2-4.204 4.2z"/></svg>,
  },
  {
    name: 'TensorFlow',
    color: '#FF6F00',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%"><path d="M22.678 5.004L12.16.08a.5.5 0 0 0-.32 0L1.322 5.004A.5.5 0 0 0 1 5.45v13.1c0 .19.108.364.278.45l10.518 4.924a.5.5 0 0 0 .428 0l10.518-4.924A.5.5 0 0 0 23 18.55V5.45a.5.5 0 0 0-.322-.446zM12 14.5V8l5 2.5v3.5l-5-2.5V8l-5 2.5v3.5L12 11.5v3z"/></svg>,
  },
];

function LogoNetwork() {
  const stripLogos = ALL_LOGOS.map(logo => logo.name);

  const repeatedLogos = [...stripLogos, ...stripLogos];

  return (
    <div className="hero-logo-strip" aria-hidden="true">
      <div className="hero-logo-marquee hero-logo-marquee-up">
        {repeatedLogos.map((name, index) => {
          const logo = ALL_LOGOS.find(item => item.name === name) ?? ALL_LOGOS[index % ALL_LOGOS.length];
          return (
            <div key={`${name}-${index}`} className="hero-strip-logo" title={logo.name}>
              <span className="hero-strip-logo-inner">{logo.svg}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" style={{
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      position: 'relative', overflow: 'hidden',
      paddingTop: 'clamp(60px, 12vh, 120px)',
      paddingLeft: 'clamp(16px, 5vw, 40px)',
      paddingRight: 'clamp(16px, 5vw, 40px)',
      paddingBottom: 'clamp(28px, 5vh, 48px)',
      boxSizing: 'border-box',
    }}>
      <LogoNetwork />

      {/* ── Main content ── */}
      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%', boxSizing: 'border-box' }}>

        {/* Status */}
        <Reveal delay={0} once>
          <div style={{ marginBottom: '28px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 500, color: 'var(--text-muted)' }}>
              <span style={{
                width: '7px', height: '7px', borderRadius: '50%',
                background: 'var(--accent-green)', display: 'inline-block',
                boxShadow: '0 0 0 3px var(--accent-green-bg)',
                animation: 'pulse-dot 2.4s ease-in-out infinite',
              }} />
              Available for opportunities
            </span>
          </div>
        </Reveal>

        {/* Greeting */}
        <div style={{ overflow: 'hidden', marginBottom: '4px' }}>
          <Reveal delay={80} direction="up" once>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', fontWeight: 400, color: 'var(--text-muted)', marginBottom: '8px' }}>
              Hello, I&apos;m
            </p>
          </Reveal>
        </div>

        {/* Name */}
        <div style={{ overflow: 'hidden', marginBottom: '16px' }}>
          <Reveal delay={120} direction="up" once>
            <h1 style={{
              fontFamily: "'DM Serif Display', Georgia, 'Times New Roman', serif",
              fontSize: 'clamp(44px, 10vw, 140px)',
              fontWeight: 400, lineHeight: 0.92,
              letterSpacing: '-0.03em', color: 'var(--text)',
              opacity: 1, visibility: 'visible',
            }}>
              Rakesh Mora
            </h1>
          </Reveal>
        </div>

        {/* Roles */}
        <Reveal delay={200} direction="up" once>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '36px', flexWrap: 'wrap' }}>
            {['Software Engineer', 'Full Stack Developer', 'UI / UX'].map((role, i, arr) => (
              <span key={role} style={{ display: 'contents' }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 400, color: 'var(--text-muted)' }}>{role}</span>
                {i < arr.length - 1 && <span style={{ width: '4px', height: '4px', background: 'var(--text-dim)', borderRadius: '50%', flexShrink: 0 }} />}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Bottom row */}
        <Reveal delay={280} direction="up" once>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '28px', flexWrap: 'wrap' }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', fontWeight: 400, color: 'var(--text-muted)', maxWidth: '400px', lineHeight: 1.75 }}>
              I build modern, responsive and scalable web applications with a focus on clean code, great UI/UX and real-world problem solving.
            </p>

            <div className="hero-actions" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              {/* Social icons */}
              {[
                { href: 'https://github.com/RAKESH-MORA', label: 'GitHub',
                  svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg> },
                { href: 'https://linkedin.com/in/rakesh-mora-78809a2b7', label: 'LinkedIn',
                  svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg> },
                { href: 'mailto:rakeshmora65@gmail.com', label: 'Email',
                  svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg> },
              ].map(s => (
                <a key={s.label} href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer" aria-label={s.label}
                  style={{ width: '38px', height: '38px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid var(--border)', borderRadius: '10px', color: 'var(--text-muted)', textDecoration: 'none', transition: 'all 0.2s ease' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border-mid)'; el.style.color = 'var(--text)'; el.style.background = 'var(--tag-bg)'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border)'; el.style.color = 'var(--text-muted)'; el.style.background = 'transparent'; }}
                >{s.svg}</a>
              ))}

              <a href="#projects" style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '10px 20px', background: 'var(--text)', color: 'var(--bg)', fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, textDecoration: 'none', borderRadius: '100px', whiteSpace: 'nowrap', transition: 'opacity 0.2s ease, transform 0.2s ease' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.84'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
              >
                View Projects
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </a>

              <a href="#contact" style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '10px 18px', border: '1.5px solid var(--border)', color: 'var(--text)', fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, textDecoration: 'none', borderRadius: '100px', whiteSpace: 'nowrap', transition: 'all 0.2s ease' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-mid)'; (e.currentTarget as HTMLElement).style.background = 'var(--tag-bg)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M7 1a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm-5 11a5 5 0 0 1 10 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
                Hire Me
              </a>

              <a href="#skills" style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '10px 18px', border: '1.5px solid var(--border)', color: 'var(--text)', fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, textDecoration: 'none', borderRadius: '100px', whiteSpace: 'nowrap', transition: 'all 0.2s ease' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-mid)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'}
              >
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 4h10M2 7h7M2 10h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
                Skills
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-ind" style={{
        position: 'absolute', bottom: '28px', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
        animation: 'fadeInUp 1s 1.2s both', zIndex: 1,
      }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', letterSpacing: '0.14em', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Scroll</span>
        <div style={{ position: 'relative', width: '1px', height: '44px', background: 'var(--border)' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '1px', background: 'var(--text-muted)', animation: 'scrollLine 2s ease-in-out infinite' }} />
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { box-shadow: 0 0 0 3px var(--accent-green-bg); }
          50%       { box-shadow: 0 0 0 6px var(--accent-green-bg); }
        }
        @keyframes scrollLine {
          0%   { height: 0;    top: 0; }
          50%  { height: 44px; top: 0; }
          100% { height: 0;    top: 44px; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateX(-50%) translateY(12px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes marqueeUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes marqueeHorizontal {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .hero-logo-strip {
          position: absolute;
          right: clamp(48px, 4vw, 110px);
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 1;
          pointer-events: none;
          width: 120px;
          height: min(68vh, 560px);
          overflow: hidden;
          mask-image: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.95) 10%, rgba(0,0,0,1) 45%, rgba(0,0,0,1) 55%, rgba(0,0,0,0.95) 90%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.95) 10%, rgba(0,0,0,1) 45%, rgba(0,0,0,1) 55%, rgba(0,0,0,0.95) 90%, transparent 100%);
        }

        .hero-logo-marquee {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          width: 100%;
          min-width: max-content;
          will-change: transform;
        }

        .hero-logo-marquee-up {
          animation: marqueeUp 40s linear infinite;
        }

        .hero-strip-logo {
          position: relative;
          width: clamp(62px, 4.5vw, 92px);
          height: clamp(62px, 4.5vw, 92px);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 18px;
          background: transparent;
          border: none;
          box-shadow: none;
          overflow: visible;
          filter: grayscale(100%) brightness(0.9) drop-shadow(0 8px 18px rgba(0,0,0,0.12));
          opacity: 0.86;
        }

        .hero-strip-logo-inner {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 78%;
          height: 78%;
          color: var(--text);
        }

        .hero-strip-logo-inner svg {
          width: 100%;
          height: 100%;
        }

        @media (max-width: 768px) {
          #home {
            padding-top: clamp(60px, 8vh, 100px) !important;
            padding-left: clamp(16px, 4vw, 24px) !important;
            padding-right: clamp(16px, 4vw, 24px) !important;
            padding-bottom: clamp(20px, 4vh, 40px) !important;
          }
          .hero-logo-strip {
            position: static;
            transform: none;
            margin: 0 auto 22px;
            width: min(96vw, 560px);
            height: 124px;
            overflow: hidden;
            mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.95) 8%, rgba(0,0,0,1) 22%, rgba(0,0,0,1) 78%, rgba(0,0,0,0.95) 92%, transparent 100%);
            -webkit-mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.95) 8%, rgba(0,0,0,1) 22%, rgba(0,0,0,1) 78%, rgba(0,0,0,0.95) 92%, transparent 100%);
          }

          .hero-logo-marquee {
            flex-direction: row;
            align-items: center;
            gap: 14px;
            width: max-content;
            min-width: max-content;
            animation: marqueeHorizontal 30s linear infinite;
          }

          .hero-strip-logo {
            width: clamp(58px, 14vw, 76px);
            height: clamp(58px, 14vw, 76px);
          }

        }

        @media (prefers-reduced-motion: reduce) {
          .hero-logo-orbit,
          .hero-orbit-list,
          .hero-orbit-item { animation: none !important; }
        }

        @media (max-width: 480px) {
          #home {
            padding-top: clamp(48px, 6vh, 80px) !important;
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}