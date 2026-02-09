import { Button, EButtonViewType } from '@/shared/ui';
import type { JSX } from 'react';

import UserSvgr from './user.svg?react';
import styles from './ProfileBtn.module.scss';


function ProfileBtn(): JSX.Element {
    return <Button
        viewType={ EButtonViewType.Icon }
        icon={ <UserSvgr className={ styles['profile-btn-icon'] } /> }
    />;
}

export default ProfileBtn;
