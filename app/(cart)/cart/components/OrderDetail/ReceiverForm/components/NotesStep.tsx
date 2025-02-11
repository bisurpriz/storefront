import Textarea from "@/components/Textarea";
import { Controller } from "react-hook-form";
import { BaseStepProps } from "../types";

export function NotesStep({ control }: BaseStepProps) {
  return (
    <div className="space-y-6">
      <Controller
        name="notes"
        control={control}
        render={({ field, fieldState: { error, isDirty } }) => (
          <Textarea
            {...field}
            error={!!error?.message}
            errorMessage={error?.message}
            label="Teslimat Notu"
            id="notes"
            placeholder="Teslimat için ek notunuz varsa buraya yazabilirsiniz"
            rows={3}
            dirtyAnimation={isDirty}
          />
        )}
      />
    </div>
  );
}
