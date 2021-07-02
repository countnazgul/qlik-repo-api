import { QlikRepoApi } from "./main";

import {
  IHttpStatus,
  ITag,
  ITagCondensed,
  IHttpReturnRemove,
  IHttpReturn,
  IRemoveFilter,
} from "./interfaces";
import { modifiedDateTime, isGUIDError } from "./util/generic";

export class Tag {
  constructor() {}

  public async tagGet(this: QlikRepoApi, id: string): Promise<ITag> {
    if (!id) throw new Error(`"id" is required`);
    isGUIDError(id);

    return await this.repoClient
      .Get(`tag/${id}`)
      .then((res) => res.data as ITag);
  }

  public async tagGetAll(this: QlikRepoApi): Promise<ITag[]> {
    return await this.repoClient.Get(`tag`).then((res) => res.data as ITag[]);
  }

  public async tagGetFilter(
    this: QlikRepoApi,
    filter: string,
    full = true
  ): Promise<ITagCondensed[]> {
    if (!filter) throw new Error(`"Filter" is required`);
    let baseUrl = `tag`;
    if (full) baseUrl += `/full`;

    return await this.repoClient
      .Get(`${baseUrl}?filter=(${encodeURIComponent(filter)})`)
      .then((res) => res.data as ITag[]);
  }

  public async tagCreate(this: QlikRepoApi, name: string): Promise<ITag> {
    if (!name) throw new Error(`"Name" is required`);
    return await this.repoClient
      .Post(`tag`, { name })
      .then((res) => res.data as ITag);
  }

  public async tagRemove(
    this: QlikRepoApi,
    id: string
  ): Promise<IHttpReturnRemove> {
    if (!id) throw new Error(`"id" is required`);
    isGUIDError(id);

    return await this.repoClient.Delete(`tag/${id}`).then((res) => {
      return { id, status: res.status as IHttpStatus };
    });
  }

  public async tagRemoveFilter(
    this: QlikRepoApi,
    filter: string
  ): Promise<IRemoveFilter[]> {
    if (!filter) throw new Error(`"Filter" is required`);

    const tags = await this.tagGetFilter(filter);
    return await Promise.all<IRemoveFilter>(
      tags.map((tag: ITag) => {
        return this.repoClient
          .Delete(`tag/${tag.id}`)
          .then((res: IHttpReturn) => {
            return { id: tag.id, status: res.status };
          });
      })
    );
  }

  public async tagUpdate(
    this: QlikRepoApi,
    id: string,
    name: string
  ): Promise<ITag> {
    if (!id) throw new Error(`"id" is required`);
    isGUIDError(id);
    if (!name) throw new Error(`"name" is required`);

    return await this.repoClient
      .Put(`tag/${id}`, { name, modifiedDate: modifiedDateTime() })
      .then((res) => res.data as ITag);
  }
}
