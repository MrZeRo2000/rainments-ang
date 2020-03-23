
export class RepositoryUtils {
  public static getNetworkErrorMessage(error: any): string {
    return (error.error && error.error.message) || error.message;
  }
}
