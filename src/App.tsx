import React from "react";
import { FormProvider } from "react-hook-form";
import { Button, Grid } from "@material-ui/core";
import FormInput from "./form/formInput";
import { useAppHook } from "./AppHook";

export default function App() {
  const { fields, isSubmitDisabled, formInformation, onSubmit } = useAppHook();

  return (
    <div style={{ padding: "10px" }}>
      <div style={{ padding: "10px" }}>
        <FormProvider {...formInformation}>
          <form>
            <Grid container>
              <Grid item xs={12}>
                <FormInput {...fields.fullName} />
              </Grid>
              <Grid item xs={12}>
                <FormInput {...fields.email} />
              </Grid>
              <Grid item xs={12}>
                <FormInput {...fields.age} />
              </Grid>
            </Grid>
          </form>
          <Button
            variant="contained"
            color="primary"
            disabled={isSubmitDisabled}
            onClick={formInformation.handleSubmit(onSubmit)}
          >
            SUBMIT
          </Button>
        </FormProvider>
      </div>
    </div>
  );
}
