import { Chart } from "cdk8s";
import { Application } from "../../imports/argoproj.io.ts";
import versions from "../versions.ts";

export function createSystemUpgradeControllerApp(chart: Chart) {
  return new Application(chart, "system-upgrade-controller-app", {
    metadata: {
      name: "system-upgrade-controller",
    },
    spec: {
      project: "default",
      source: {
        // https://github.com/rancher/system-upgrade-controller
        repoUrl: "https://github.com/rancher/system-upgrade-controller/",
        path: ".",
        targetRevision: versions["rancher/system-upgrade-controller"],
        kustomize: {},
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "system-upgrade",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
