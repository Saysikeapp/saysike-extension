import { Header } from "../../components/Header";
import { ContentBox } from "../../containers/ContentBox";
import { Navbar } from "../../components/Navbar";
import { Fallback } from "../../components/Fallback";
import { ErrorBoundary } from "react-error-boundary";
import { JSX } from "react";

const App: () => JSX.Element = () => {
  return (
    <div className="relative flex flex-col overflow-hidden w-full h-full">
      <ErrorBoundary
        fallback={<Fallback />}
        onError={() => {
          // TODO: Put affiliate error handling here
        }}
      >
        <Header />
        <ContentBox />
        <Navbar />
      </ErrorBoundary>
    </div>
  );
};

export default App;
