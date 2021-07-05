import { QlikRepoApi } from "./main";

import { modifiedDateTime, isGUIDError } from "./util/generic";
import { IEngine } from "./interfaces";
import { IEngineUpdate } from "./interfaces/argument.interface";

export class Engine {
  constructor() {}

  public async engineGet(this: QlikRepoApi, id: string): Promise<IEngine> {
    if (!id) throw new Error(`"id" is required`);
    isGUIDError(id);

    return await this.repoClient
      .Get(`engineservice/${id}`)
      .then((res) => res.data as IEngine);
  }

  public async engineGetAll(this: QlikRepoApi): Promise<IEngine[]> {
    return await this.repoClient
      .Get(`engineservice/full`)
      .then((res) => res.data as IEngine[]);
  }

  public async engineGetFilter(
    this: QlikRepoApi,
    filter: string
  ): Promise<IEngine[]> {
    if (!filter) throw new Error(`"Filter" is required`);
    let baseUrl = `engineservice/full`;

    return await this.repoClient
      .Get(`${baseUrl}?filter=(${encodeURIComponent(filter)})`)
      .then((res) => res.data as IEngine[]);
  }

  public async engineUpdate(
    this: QlikRepoApi,
    arg: IEngineUpdate
  ): Promise<IEngine> {
    if (!arg.id) throw new Error(`"id" is required`);
    isGUIDError(arg.id);

    let engine = await this.engineGet(arg.id);

    if (arg.workingSetSizeLoPct)
      engine.settings.workingSetSizeLoPct = arg.workingSetSizeLoPct;

    if (arg.workingSetSizeHiPct)
      engine.settings.workingSetSizeHiPct = arg.workingSetSizeHiPct;

    if (arg.cpuThrottlePercentage)
      engine.settings.cpuThrottlePercentage = arg.cpuThrottlePercentage;

    if (arg.workingSetSizeMode) {
      if (
        arg.workingSetSizeMode != "IgnoreMaxLimit" &&
        arg.workingSetSizeMode != "SoftMaxLimit" &&
        arg.workingSetSizeMode != "HardMaxLimit"
      )
        throw new Error(
          `Engine config working set valid values are: IgnoreMaxLimit, SoftMaxLimit, HardMaxLimit`
        );

      if (arg.workingSetSizeMode == "IgnoreMaxLimit")
        engine.settings.workingSetSizeMode == 0;

      if (arg.workingSetSizeMode == "SoftMaxLimit")
        engine.settings.workingSetSizeMode == 1;

      if (arg.workingSetSizeMode == "HardMaxLimit")
        engine.settings.workingSetSizeMode == 2;
    }

    if (arg.coresToAllocate) {
      let mask = [0, 0, 0, 0, 0, 0, 0, 0];
      let bin = "".padEnd(arg.coresToAllocate, "1").padStart(256, "0");

      let [
        maxCoreMaskGrp3HiPersisted,
        maxCoreMaskGrp3Persisted,
        maxCoreMaskGrp2HiPersisted,
        maxCoreMaskGrp2Persisted,
        maxCoreMaskGrp1HiPersisted,
        maxCoreMaskGrp1Persisted,
        maxCoreMaskHiPersisted,
        maxCoreMaskPersisted,
      ] = mask.map((m, i) => parseInt(bin.substr(i * 32 * 32)), 2);

      engine.settings.maxCoreMaskPersisted = maxCoreMaskPersisted;
      engine.settings.maxCoreMaskHiPersisted = maxCoreMaskHiPersisted;
      engine.settings.maxCoreMaskGrp1Persisted = maxCoreMaskGrp1Persisted;
      engine.settings.maxCoreMaskGrp1HiPersisted = maxCoreMaskGrp1HiPersisted;
      engine.settings.maxCoreMaskGrp2Persisted = maxCoreMaskGrp2Persisted;
      engine.settings.maxCoreMaskGrp2HiPersisted = maxCoreMaskGrp2HiPersisted;
      engine.settings.maxCoreMaskGrp3Persisted = maxCoreMaskGrp3Persisted;
      engine.settings.maxCoreMaskGrp3HiPersisted = maxCoreMaskGrp3HiPersisted;
    }

    if (arg.documentDirectory)
      engine.settings.documentDirectory = arg.documentDirectory;

    if (arg.allowDataLineage)
      engine.settings.allowDataLineage = arg.allowDataLineage;

    if (arg.standardReload) engine.settings.standardReload = arg.standardReload;

    if (arg.documentTimeout)
      engine.settings.documentTimeout = arg.documentTimeout;

    if (arg.autosaveInterval)
      engine.settings.autosaveInterval = arg.autosaveInterval;

    if (arg.genericUndoBufferMaxSize)
      engine.settings.genericUndoBufferMaxSize = arg.genericUndoBufferMaxSize;

    if (arg.auditActivityLogVerbosity)
      engine.settings.auditActivityLogVerbosity = arg.auditActivityLogVerbosity;

    if (arg.auditSecurityLogVerbosity)
      engine.settings.auditSecurityLogVerbosity = arg.auditSecurityLogVerbosity;

    if (arg.systemLogVerbosity)
      engine.settings.systemLogVerbosity = arg.systemLogVerbosity;

    if (arg.externalServicesLogVerbosity)
      engine.settings.externalServicesLogVerbosity =
        arg.externalServicesLogVerbosity;

    if (arg.qixPerformanceLogVerbosity)
      engine.settings.qixPerformanceLogVerbosity =
        arg.qixPerformanceLogVerbosity;

    if (arg.serviceLogVerbosity)
      engine.settings.serviceLogVerbosity = arg.serviceLogVerbosity;

    if (arg.httpTrafficLogVerbosity)
      engine.settings.httpTrafficLogVerbosity = arg.httpTrafficLogVerbosity;

    if (arg.auditLogVerbosity)
      engine.settings.auditLogVerbosity = arg.auditLogVerbosity;

    if (arg.trafficLogVerbosity)
      engine.settings.trafficLogVerbosity = arg.trafficLogVerbosity;

    if (arg.sessionLogVerbosity)
      engine.settings.sessionLogVerbosity = arg.sessionLogVerbosity;

    if (arg.performanceLogVerbosity)
      engine.settings.performanceLogVerbosity = arg.performanceLogVerbosity;

    if (arg.sseLogVerbosity)
      engine.settings.sseLogVerbosity = arg.sseLogVerbosity;

    return await this.repoClient
      .Put(`engineservice/${arg.id}`, { modifiedDate: modifiedDateTime() })
      .then((res) => res.data as IEngine);
  }
}
