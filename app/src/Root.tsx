import { Composition, staticFile } from "remotion";
import { Video, duracionTotal } from "./Video";
import { Miniatura } from "./Miniatura";
import type { Manifiesto } from "./tipos";

type Props = { slug: string; manifiesto?: Manifiesto };

const meta = (formato: "largo" | "short") => async ({ props }: { props: Props }) => {
  const res = await fetch(staticFile(`obras/${props.slug}/${formato}/manifiesto.json`));
  const manifiesto = (await res.json()) as Manifiesto;
  return { durationInFrames: duracionTotal(manifiesto), fps: manifiesto.fps, props: { ...props, manifiesto } };
};

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Largo" component={Video} fps={30} width={1920} height={1080} durationInFrames={240} defaultProps={{ slug: "farero-1890" } as Props} calculateMetadata={meta("largo")} />
    <Composition id="MiniaturaLargo" component={Miniatura} fps={30} width={1280} height={720} durationInFrames={60} defaultProps={{ slug: "farero-1890" } as Props} calculateMetadata={async (a) => ({ ...(await meta("largo")(a)), durationInFrames: 60 })} />
    <Composition id="MiniaturaShort" component={Miniatura} fps={30} width={1080} height={1920} durationInFrames={60} defaultProps={{ slug: "farero-1890" } as Props} calculateMetadata={async (a) => ({ ...(await meta("largo")(a)), durationInFrames: 60 })} />
    <Composition id="Short" component={Video} fps={30} width={1080} height={1920} durationInFrames={240} defaultProps={{ slug: "farero-1890" } as Props} calculateMetadata={meta("short")} />
  </>
);
