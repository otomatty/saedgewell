import type { BlogPost } from "../../../../../../../packages/types/src/blog";

interface BlogPostListProps {
	blogPosts: BlogPost[];
}

export const BlogPostList: React.FC<BlogPostListProps> = ({ blogPosts }) => {
	return (
		<ul>
			{blogPosts?.map((post) => (
				<li key={post.id}>{post.title}</li>
			))}
		</ul>
	);
};
