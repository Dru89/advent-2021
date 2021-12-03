import fetch from "isomorphic-fetch";
import assert from "./assert";
import { isPositiveInteger } from "./numbers";

function enforcePositiveInteger(value: unknown, field: string): number {
  assert(isPositiveInteger(value), `${field} must be a positive integer`);
  return parseInt(value as string);
}

export async function fetchText(
  day: string | number,
  year: string | number = "2021"
): Promise<string> {
  const response = await fetch_(day, year);
  return response.text();
}

export async function fetchJson(
  day: string | number,
  year: string | number = "2021"
): Promise<unknown> {
  const response = await fetch_(day, year);
  return response.json();
}

export default async function fetch_(
  day: string | number,
  year: string | number = "2021"
): Promise<Response> {
  if (!process.env.SESSION_COOKIE) {
    throw new Error(
      "Please set SESSION_COOKIE to your Advent of Code session cookie before running this script."
    );
  }

  const dayNum = enforcePositiveInteger(day, "day");
  const yearNum = enforcePositiveInteger(year, "year");

  if (day > 25) {
    throw new Error("There are no Advent of Code puzzles after December 25.");
  }

  // const date = new Date(yearNum, 11, dayNum);
  // if (date.getTime() > Date.now()) {
  //   throw new Error(
  //     `The Advent of Code puzzle for December ${dayNum}, ${yearNum} has not been released.`
  //   );
  // }

  const req = new Request(
    `https://adventofcode.com/${yearNum}/day/${dayNum}/input`,
    {
      headers: {
        Cookie: `session=${process.env.SESSION_COOKIE}`,
      },
    }
  );

  const response = await fetch(req);
  switch (response.status) {
    case 200: {
      return response;
    }
    case 400: {
      throw new Error("Could not fetch puzzle. Maybe invalid session token?");
    }
    case 404: {
      throw new Error("That puzzle doesn't exist! Are you too early?");
    }
    default: {
      throw new Error(
        `Not totally sure what happened. Got status: ${
          response.status
        }. Body: ${await response.text()}`
      );
    }
  }
}
