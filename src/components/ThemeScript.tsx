import { getThemeScript } from "@/lib/site";

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: getThemeScript() }} />;
}
