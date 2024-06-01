export function entityCreated<T extends { id: string | number }>(entt: T) {
  return {
    message: "Created Successfully",
    id: entt.id
  };
}

export function entityUpdated<T extends { id: string | number }>(entt: T) {
  return {
    message: "Updated Successfully",
    id: entt.id
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
