import { getProjects } from '@/lib/services/project.service'
import type { PaginationMeta } from '@/lib/types/generals'
import { ProjectsView } from './projects-view'

export default async function ProjectsPage({
  searchParams,
}: PageProps<'/[locale]/projects'>) {
  const query = await searchParams

  let page = Math.floor(Number(query.page))
  if (!page || page < 1) {
    page = 1
  }

  let limit = Math.floor(Number(query.limit))
  if (!limit || limit < 1) {
    limit = 6
  }
  if (limit > 100) {
    limit = 100
  }

  const res = await getProjects({ offset: (page - 1) * limit, limit })

  let pagination: PaginationMeta | undefined
  if (res.metadata) {
    const totalPages = Math.ceil(res.metadata.total / limit)
    pagination = {
      page,
      limit,
      total: res.metadata.total,
      totalPages,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
    }
  }

  return <ProjectsView projects={res.data} pagination={pagination} />
}
