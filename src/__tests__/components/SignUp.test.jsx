import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { SignUpContainer } from '../../components/SignUp';

describe('SignUp', () => {
  describe('SignUpContainer', () => {
    it('calls onSubmit with correct values when form is submitted', async () => {
      const onSubmit = jest.fn();
      const { getByPlaceholderText, getByText } = render(
        <SignUpContainer onSubmit={onSubmit} />,
      );

      fireEvent.changeText(getByPlaceholderText('Username'), 'newuser');
      fireEvent.changeText(getByPlaceholderText('Password'), 'secret');
      fireEvent.changeText(
        getByPlaceholderText('Password confirmation'),
        'secret',
      );
      fireEvent.press(getByText('Sign up'));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'newuser',
          password: 'secret',
          passwordConfirmation: 'secret',
        });
      });
    });
  });
});
