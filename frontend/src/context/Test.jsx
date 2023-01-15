import { createContext, useContext, useState } from "react";

const TestContext = createContext({});

export const useTestContext = () => useContext(TestContext);


export const TestProvider = ({ children }) => {
    const [message, setMessage] = useState('done');

    return (
        <TestContext.Provider
            value={{
                message
            }}
        >
            {children}
        </TestContext.Provider>
    )
}