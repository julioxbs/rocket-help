import { Button as NativeBaseButton, IButtonProps, Heading } from 'native-base';

type ButtonProps = IButtonProps & {
    title: string;
}

export function Button({ title, ...rest }: ButtonProps) {
  return (
    <NativeBaseButton
        h={14}
        fontSize="sm"
        rounded="sm"
        {...rest}
    >
        <Heading color="white" fontSize="sm">
            {title}
        </Heading>
    </NativeBaseButton>
  );
}