import { httpClient } from '@/api';
import type { ProjectDetail, ProjectInput } from '@/api/endpoint_LEGACY/projects/type';

// project id로 조회
export const getProjectById = async (id: string) => {
  const data = await httpClient.request<ProjectDetail>(`api/v1/projects/${id}`, { method: 'GET' });

  return data;
};

// project 생성
export const postProject = (input: ProjectInput) => {
  return httpClient.request('api/v1/projects', { method: 'POST', json: input });
};

// project 수정
export const putProject = ({ id, data }: { id: number; data: ProjectInput }) => {
  return httpClient.request(`api/v1/projects/${id}`, { method: 'PUT', json: data });
};

// project 삭제
export const deleteProject = (id: number) => {
  return httpClient.request(`api/v1/projects/${id}`, { method: 'DELETE' });
};
