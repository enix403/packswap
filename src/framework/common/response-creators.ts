import { NotFoundException } from "@nestjs/common";
import { UpdateResult } from "typeorm";

export function entityCreated<T extends { id: string | number }>(entt?: T) {
  return {
    message: "Created Successfully",
    ...(entt ? { id: entt.id } : {})
  };
}

export function entityUpdated<T extends { id: string | number }>(entt?: T) {
  return {
    message: "Updated Successfully",
    ...(entt ? { id: entt.id } : {})
  };
}

export function entityDeleted() {
  return {
    message: "Deleted Successfully"
  };
}

export function sendMessage(message: string, rest: object = {}) {
  return { message, ...rest };
}

export async function ensureUpdate(updateResultPromise: Promise<UpdateResult>) {
  let result = await updateResultPromise;
  if (result.affected === 0) {
    throw new NotFoundException();
  }
}
