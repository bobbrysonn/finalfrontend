"use server";

import { ReviewDataSchema } from "@/lib/definitions";

export async function createReview(formData: ReviewDataSchema) {

  try {
    const response = await fetch(`${process.env.API_ROOT}/api/reviews/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.status === 201) {
      return { error: false, message: "Review successfully created!" };
    } else {
      return {
        error: true,
        message: "Failed to create review",
      };
    }
  } catch (error) {
    throw error;
  }
}
