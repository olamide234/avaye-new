"use client";
import React, { useState } from "react";
import type { CascaderProps } from "antd";
import { useForm, Controller } from "react-hook-form";
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
} from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const { Option } = Select;

interface DataNodeType {
  value: string;
  label: string;
  children?: DataNodeType[];
}

interface IFormValues {
  email: string;
  password: string;
  residence: DataNodeType[];
  gender: string;
  choice: string;
  agreement: boolean;
}

const residences: CascaderProps<DataNodeType>["options"] = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake",
          },
        ],
      },
    ],
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men",
          },
        ],
      },
    ],
  },
];

export default function FormPage() {
  const validationSchema = z.object({
    password: z.string().min(1, { message: "Required" }),
    email: z.string().email({ message: "Invalid email" }),
    residence: z
      .array(
        z.object(
          { value: z.string(), label: z.string() },
          {
            message: "Select one",
          }
        ),
        {
          message: "Required",
        }
      )
      .optional(),
    gender: z.string({
      message: "Required",
    }),
    choice: z.string({
      message: "Required",
    }),
    agreement: z.boolean(),
  });

  const {
    control,
    getValues,
    watch,
    handleSubmit,
    setValue,
    clearErrors,
    setError,
    formState,
  } = useForm<IFormValues>({
    defaultValues,
    mode: "onBlur", //"onChange",
    resolver: zodResolver(validationSchema),
    shouldUnregister: true,
    reValidateMode: "onChange",
  });
  const formValues = watch();

  const handleRegister = (values: any) => {
    console.log(getValues(), formValues, "submit", values);
  };

  console.log(getValues(), "getValues");
  console.log(formValues, "formValues");
  console.log(!formState.isValid, "isValid");
  return (
    <div>
      <div>Email:</div>
      <Controller
        name="email"
        // rules={{ required: "Field is required" }}
        control={control}
        render={({
          field: { ref, onChange, ...inputProps },
          fieldState: { error },
        }) => (
          <>
            <Input ref={ref} onChange={onChange} />
            <div>{error?.message}</div>
          </>
        )}
      />

      <div>Password:</div>
      <Controller
        name="password"
        control={control}
        render={({
          field: { ref, onChange, ...inputProps },
          fieldState: { error },
        }) => (
          <>
            <Input.Password onChange={onChange} />
            <div>{error?.message}</div>
          </>
        )}
      />
      <div>Gender:</div>
      <Controller
        name="gender"
        control={control}
        render={({
          field: { ref, onChange, ...inputProps },
          fieldState: { error },
        }) => (
          <>
            <Select placeholder="select your gender" onChange={onChange}>
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
            <div>{error?.message}</div>
          </>
        )}
      />

      <div>Residence:</div>
      <Controller
        name="residence"
        control={control}
        render={({
          field: { ref, onChange, ...inputProps },
          fieldState: { error },
        }) => (
          <>
            <Cascader options={residences} onChange={onChange} />
            <div>{error?.message}</div>
          </>
        )}
      />

      <div>Choice:</div>
      <Controller
        name="choice"
        control={control}
        render={({
          field: { ref, onChange, ...inputProps },
          fieldState: { error },
        }) => (
          <>
            <Radio.Group onChange={onChange}>
              <Radio value="yes"> Yes </Radio>
              <Radio value="no"> No </Radio>
            </Radio.Group>
            <div>{error?.message}</div>
          </>
        )}
      />

      <Controller
        name="agreement"
        control={control}
        render={({
          field: { ref, onChange, ...inputProps },
          fieldState: { error },
        }) => (
          <>
            <Checkbox onChange={onChange}>
              I have read the <a href="">agreement</a>
            </Checkbox>
            <div>{error?.message}</div>
          </>
        )}
      />
      <button
        // disabled={!formState.isValid}
        onClick={handleSubmit(handleRegister)}
      >
        Register
      </button>
    </div>
  );
}

const defaultValues = {
  email: "",
  password: "",
  residence: [],
  gender: undefined,
  choice: undefined,
  agreement: false,
};
