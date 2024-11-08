import { applyDecorators, HttpStatus } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { User } from "@/user/entities/user.entity";
import { Artist } from "@/artist/entities/artist.entity";
import { Track } from "@/track/entities/track.entity";
import { Album } from "@/album/entities/album.entity";
import { Favorite } from "@/favorite/entities/favorite.entity";

type Entity =
  | typeof User
  | typeof Artist
  | typeof Track
  | typeof Album
  | typeof Favorite;
type EntityName = "user" | "artist" | "album" | "track" | "favorite";
type Target = Exclude<EntityName, "favorite">;

function Api400404Responses() {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: "Id is invalid",
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: "Id doesn't exist",
    }),
  );
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
