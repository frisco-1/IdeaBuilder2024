//This file is for whenever the page catches runtime errors like:
/* missing DB collection
res.json() fails
undefined variables
bad slugs
*/

//This component will be added into App.tsx Only to handle runtime errors
import { Component, ReactNode } from "react";
import { PiWarningCircleFill } from "react-icons/pi";


interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false};
    }
    static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }
    render() {
        if(this.state.hasError) {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
                    <PiWarningCircleFill className="text-red-600 text-6xl mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
                    <p className="text-gray-600 mb-6">
                        We couldn't load this page. Please try again later.
                    </p>
                    <a
                        href="/"
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Go Home
                    </a>
                </div>
            );
    }

    return this.props.children;
  }
}
