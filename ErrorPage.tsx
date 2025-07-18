import { useRouteError, Link } from "react-router-dom";

export function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div className="bg-background text-foreground min-h-screen w-full flex flex-col items-center justify-center p-8 gap-4 text-center">
      <h1 className="font-heading text-6xl font-bold">Oops!</h1>
      <p className="text-xl text-slate-300">Ne pare rău, a apărut o eroare neașteptată.</p>
      <p className="text-lg text-slate-500">
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to="/" className="mt-6 font-heading text-white font-bold py-3 px-8 rounded-full text-lg bg-accent-gradient tracking-wider">
        Înapoi Acasă
      </Link>
    </div>
  );
}