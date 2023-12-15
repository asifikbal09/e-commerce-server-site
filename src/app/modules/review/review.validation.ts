import { z } from "zod"




const reviewValidationSchema = z.object({
body:z.object({
    courseId: z.string(),
    rating: z.number().refine((val) => val >= 1 && val <= 5, {
        message: "Rating must be between 1 and 5",
      }),
    review: z.string(),
})
})

export const ReviewValidations={
    reviewValidationSchema
}