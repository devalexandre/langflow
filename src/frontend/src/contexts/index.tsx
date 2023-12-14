import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { ReactFlowProvider } from "reactflow";
import { TooltipProvider } from "../components/ui/tooltip";
import { ApiInterceptor } from "../controllers/API/api";
import { AlertProvider } from "./alertContext";
import { AuthProvider } from "./authContext";
import { DarkProvider } from "./darkContext";
import FlowManagerProvider from "./flowManagerContext";
import { FlowsProvider } from "./flowsContext";
import { LocationProvider } from "./locationContext";
import { StoreProvider } from "./storeContext";

import { TypesProvider } from "./typesContext";
import { UndoRedoProvider } from "./undoRedoContext";

export default function ContextWrapper({ children }: { children: ReactNode }) {
  //element to wrap all context
  return (
    <>
      <BrowserRouter>
        <AlertProvider>
          <AuthProvider>
            <TooltipProvider>
              <ReactFlowProvider>
                <DarkProvider>
                  <TypesProvider>
                    <LocationProvider>
                      <ApiInterceptor />
                      <FlowsProvider>
                        <UndoRedoProvider>
                          <FlowManagerProvider>
                            <StoreProvider>{children}</StoreProvider>{" "}
                          </FlowManagerProvider>
                        </UndoRedoProvider>
                      </FlowsProvider>
                    </LocationProvider>
                  </TypesProvider>
                </DarkProvider>
              </ReactFlowProvider>
            </TooltipProvider>
          </AuthProvider>
        </AlertProvider>
      </BrowserRouter>
    </>
  );
}
