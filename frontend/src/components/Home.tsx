import {Users} from "./User";
import {ThreeCanvas} from "./Scene";

export default function Home() {
  return (<div>
      <Title/>
      <Subtitle/>
      <ThreeCanvas/>
      <Users/>
    </div>
  );
}

export function Title() {
  return (<h1>Doggr</h1>)
}

export function Subtitle() {
  return (<h3>Where your pets find love(tm)</h3>)
}
