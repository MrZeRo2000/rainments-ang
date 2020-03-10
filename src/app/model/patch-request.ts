export class PatchRequest {
  constructor(public op: string, public path: string, public value?: string) {}
}
