export default function Template({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="page-shell-enter">{children}</div>;
}
