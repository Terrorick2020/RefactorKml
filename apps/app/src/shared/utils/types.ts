import { useNavigate } from 'react-router-dom';

export type TAxiosNav = ReturnType<typeof useNavigate> | null;