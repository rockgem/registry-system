"use server";

import { createClient } from "@/utils/supabase/server";


type Person = {
    first_name: string;
    middle_name: string;
    last_name: string;
}

export async function savePerson(person: Person) {
  var supabase = await createClient();

  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        first_name: person.first_name,
        middle_name: person.middle_name,
        last_name: person.last_name
      },
    ]);

    if (error) {
        throw error;
    }

}
