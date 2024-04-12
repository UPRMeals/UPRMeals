export class JWTUtils {
  public static isTokenValid(token: string | null): boolean {
    if (token !== null) {
      try {
        const [header, payload, signature] = token.split(".");
        const decodedPayload = JSON.parse(
          Buffer.from(payload, "base64").toString("utf-8")
        );

        const expirationDate = new Date(decodedPayload.exp * 1000);
        if (expirationDate > new Date()) {
          return true;
        }
      } catch (error) {
        console.error("Error decoding token.", error);
        return false;
      }
    }
    return false;
  }

  public static isStaffUser(token: string | null): boolean {
    if (token !== null) {
      try {
        const [header, payload, signature] = token.split(".");
        const decodedPayload = JSON.parse(
          Buffer.from(payload, "base64").toString("utf-8")
        );
        return decodedPayload?.isStaff;
      } catch (error) {
        console.error("Error decoding token.", error);
        return false;
      }
    }
    return false;
  }
}
