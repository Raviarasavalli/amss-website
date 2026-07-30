/**
 * Central asset registry.
 *
 * WHY THIS FILE EXISTS:
 * Vite (and all modern bundlers) resolve images at BUILD TIME.
 * Any path stored as a plain string in a JSON file (e.g. "/src/assets/…")
 * is NOT processed by Vite and will return a 404 in production because
 * the `src/` directory simply does not exist after `vite build` – only
 * the compiled `dist/` output does.
 *
 * The ONLY correct way to reference an asset that lives inside `src/` is
 * to import it as an ES module.  Vite will then:
 *   1. Copy the file to `dist/assets/` with a content-hash filename.
 *   2. Replace the import with the final hashed URL string.
 *
 * Usage:
 *   import { logoImg, heroImg } from '@/assets/images';
 *   <img src={logoImg} />
 */

// ── Logo ─────────────────────────────────────────────────────────────────────
import logoImg from './logo/logo.png';

// ── Hero / Placeholder images ─────────────────────────────────────────────────
import heroImg from './placeholders/hero.png';

// ── Team member photos ────────────────────────────────────────────────────────
import teamRavi         from './placeholders/team_ravi.png';
import teamSimhachalam  from './placeholders/team_simhachalam.jpg';
import teamSravan       from './placeholders/team_sravan.jpg';
import teamAnil         from './placeholders/team_anil.png';
import teamDeepika      from './placeholders/team_deepika.png';
import teamKarthik      from './placeholders/team_karthik.png';
import teamRevathi      from './placeholders/team_revathi.png';
import teamPujitha      from './placeholders/team_pujitha.png';
import teamAnitha       from './placeholders/team_anitha.jpg';
import teamAjay         from './placeholders/team_ajay.png';
import teamSuresh       from './placeholders/team_suresh.png';
import teamSaiRam       from './placeholders/team_sai_ram.png';
import teamSwapna       from './placeholders/team_swapna.png';
import teamVandana      from './placeholders/team_vandana.png';
import teamBhanuPrakash from './placeholders/team_bhanu_prakash.png';
import teamPakeeruNaidu from './placeholders/team_pakeeru_naidu.png';

// ── Activity images ───────────────────────────────────────────────────────────
import activitiesEdu   from './placeholders/activities_edu.png';
import activitiesFood  from './placeholders/activities_food.png';
import activitiesPlant from './placeholders/activities_plant.png';

// ── Team lookup map  (keyed by the `id` field in team.json) ──────────────────
export const teamImages = {
  'ravi-kiran':        teamRavi,
  'simhachalam':       teamSimhachalam,
  'sravan-kumar':      teamSravan,
  'anil-kumar':        teamAnil,
  'p-deepika':         teamDeepika,
  'g-karthik':         teamKarthik,
  'b-revathi':         teamRevathi,
  'p-pujitha':         teamPujitha,
  'v-anitha':          teamAnitha,
  'ajay-kumar':        teamAjay,
  'm-suresh':          teamSuresh,
  't-sai-ram':         teamSaiRam,
  'n-swapna':          teamSwapna,
  'k-vandana':         teamVandana,
  'A Tejeswara rao':   teamBhanuPrakash,
  'y-pakeeru-naidu':   teamPakeeruNaidu,
};

export {
  logoImg,
  heroImg,
  activitiesEdu,
  activitiesFood,
  activitiesPlant,
};
