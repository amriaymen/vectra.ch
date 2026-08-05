import Link from 'next/link';

export interface Crumb {
  label: string;
  href: string;
}

/** Visual trail. The matching BreadcrumbList JSON-LD is emitted by the page. */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const linkClass = 'transition-colors hover:text-primary';
          /*
           * Most crumbs are real routes, but the product trail's middle rung is
           * still `/{locale}#work` — there is no products index route to point
           * at. Branch rather than assume: a '#' href must stay a plain <a> so
           * the browser scrolls it against scroll-padding-top.
           */
          const isRoute = !item.href.includes('#');
          return (
            <li key={item.href} className="flex items-center gap-2">
              {isLast ? (
                <span aria-current="page" className="text-gray-400">
                  {item.label}
                </span>
              ) : isRoute ? (
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              ) : (
                <a href={item.href} className={linkClass}>
                  {item.label}
                </a>
              )}
              {!isLast && (
                <span aria-hidden="true" className="text-gray-700">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
