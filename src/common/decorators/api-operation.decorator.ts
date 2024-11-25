import { applyDecorators, HttpStatus } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { User } from "@/features/rest/user/entities/user.entity";
import { Artist } from "@/features/rest/artist/entities/artist.entity";
import { Track } from "@/features/rest/track/entities/track.entity";
import { Album } from "@/features/rest/album/entities/album.entity";
import { Favorite } from "@/features/rest/favorite/entities/favorite.entity";

type Entity =
  | typeof User
  | typeof Artist
  | typeof Track
  | typeof Album
  | typeof Favorite;
type EntityName = "user" | "artist" | "album" | "track" | "favorite";
type Target = Exclude<EntityName, "favorite">;

function ApiResponsesPostFavorite(target: Target) {
  return applyDecorators(
    ApiOperation({
      summary: `add ${target} by id to favorite`,
    }),
    ApiResponsesPost(),
    ApiResponse({
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      description: `id doesn't exist`,
    }),
  );
}

function ApiResponsesDeleteFavorite(target: Target) {
  return applyDecorators(
    ApiOperation({ summary: `delete ${target} by id from favorite` }),
    ApiResponsesDelete(),
  );
}

function Api400404Responses() {
  return applyDecorators(
    Api400Response("Id is invalid"),
    Api404Response("Id doesn't exist"),
  );
}

function Api200Response(description: string) {
  return ApiResponse({
    status: HttpStatus.OK,
    description,
  });
}

function Api201Response(description: string) {
  return ApiResponse({
    status: HttpStatus.OK,
    description,
  });
}

function Api400Response(description: string) {
  return ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description,
  });
}

function Api401Response(description: string) {
  return ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description,
  });
}

function Api403Response(description: string) {
  return ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description,
  });
}

function Api404Response(description: string) {
  return ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description,
  });
}

function ApiResponsesPost() {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.CREATED,
      description: "Created record",
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: "Request body does not contain required fields",
    }),
  );
}

function ApiResponsesPut() {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.OK,
      description: "Updated record",
    }),
    Api400404Responses(),
  );
}

function ApiResponsesDelete() {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.NO_CONTENT,
      description: "The record is found and deleted",
    }),
    Api400404Responses(),
  );
}

function ApiResponsesGetById(entity: Entity) {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.OK,
      description: "record with id exists",
      type: entity,
    }),
    Api400404Responses(),
  );
}

export function ApiOperationGetById(entityName: EntityName, entity: Entity) {
  return applyDecorators(
    ApiOperation({ summary: `get ${entityName} by id` }),
    ApiResponsesGetById(entity),
  );
}

export function ApiOperationPutById(entityName: EntityName) {
  return applyDecorators(
    ApiOperation({ summary: `change ${entityName}'s fields` }),
    ApiResponsesPut(),
  );
}

export function ApiOperationDeleteById(
  entityName: EntityName,
  target?: Target,
) {
  if (entityName === "favorite") {
    return ApiResponsesDeleteFavorite(target);
  }

  return applyDecorators(
    ApiOperation({ summary: `delete ${entityName} by id` }),
    ApiResponsesDelete(),
  );
}

export function ApiOperationGetAll(entityName: EntityName) {
  return applyDecorators(
    ApiOperation({ summary: `get ${entityName}s list` }),
    ApiResponse({
      status: HttpStatus.OK,
      description: `all ${entityName}s records`,
    }),
  );
}

export function ApiOperationPost(entityName: EntityName, target?: Target) {
  if (entityName === "favorite") {
    return ApiResponsesPostFavorite(target);
  }

  return applyDecorators(
    ApiOperation({ summary: `create a new ${entityName}` }),
    ApiResponsesPost(),
  );
}

export function ApiOperationSignup() {
  return applyDecorators(
    ApiOperation({ summary: "signup a new user" }),
    ApiResponsesPost(),
  );
}

export function ApiOperationLogin() {
  return applyDecorators(
    ApiOperation({ summary: "login" }),
    Api200Response("Data is valid"),
    Api400Response("Data is invalid"),
    Api403Response(
      "No user with such login, password doesn't match actual one",
    ),
  );
}

export function ApiOperationRefresh() {
  return applyDecorators(
    ApiOperation({ summary: "refresh tokens" }),
    Api201Response("Data is valid"),
    Api401Response("No refreshToken in body"),
    Api403Response("Refresh token is invalid or expired"),
  );
}
