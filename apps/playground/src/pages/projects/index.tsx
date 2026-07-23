import AuthRequired from '@/components/auth/AuthRequired';
import HomePopupContainer from '@/components/common/HomePopup/HomePopupContainer';
import ProjectList from '@/components/projects/main/ProjectList';
import { setLayout } from '@/utils/layout';

const ProjectPage = () => {
  return (
    <AuthRequired>
      {/* TODO: 타임캡솝 닫을 때 팝업 코드 제거 */}
      <HomePopupContainer />
      <ProjectList />
    </AuthRequired>
  );
};

setLayout(ProjectPage, 'headerFooter');

export default ProjectPage;
