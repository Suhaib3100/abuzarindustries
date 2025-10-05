'use client';

import React from 'react';
import { MenuIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetFooter } from '@/components/ui/sheet';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export function FloatingHeader() {
	const [open, setOpen] = React.useState(false);
	const [isScrolled, setIsScrolled] = React.useState(false);

	React.useEffect(() => {
		let ticking = false;
		
		const handleScroll = () => {
			if (!ticking) {
				requestAnimationFrame(() => {
					setIsScrolled(window.scrollY > 100);
					ticking = false;
				});
				ticking = true;
			}
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const links = [
		{
			label: 'Home',
			href: '/',
		},
		{
			label: 'About Us',
			href: '/about',
		},
		{
			label: 'Products',
			href: '/products',
		},
		{
			label: 'Gallery',
			href: '/gallery',
		},
		{
			label: 'Contact',
			href: '/contact',
		},
	];

	return (
		<header
			className={cn(
				'sticky z-50 transition-all duration-500 ease-in-out',
				isScrolled ? 'top-6' : 'top-0',
				'w-full border shadow-xl',
				isScrolled ? 'max-w-3xl mx-auto rounded-3xl' : 'max-w-none rounded-none',
				isScrolled 
					? 'bg-white/70 supports-[backdrop-filter]:bg-white/60 backdrop-blur-xl' 
					: 'bg-white/95 supports-[backdrop-filter]:bg-white/90 backdrop-blur-lg',
			)}
			style={{
				transition: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)',
			}}
		>
			<nav className={cn(
				'flex items-center justify-between transition-all duration-500 ease-in-out',
				isScrolled ? 'p-4 px-6 sm:px-8 max-w-6xl mx-auto' : 'p-5 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto'
			)}>
				<a href="/" className="hover:bg-accent flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 duration-300 group">
					<div className={cn(
						"relative overflow-hidden rounded-lg group-hover:scale-110 transition-all duration-300",
						isScrolled ? "w-9 h-9" : "w-12 h-12"
					)}>
						<Image
							src="/images/main-logo-1.png"
							alt="Abuzar Industries Logo"
							fill
							className="object-contain"
						/>
					</div>
					<div className="flex flex-col transition-all duration-300">
						<p className={cn(
							"font-bold text-gray-900 transition-all duration-300",
							isScrolled ? "text-sm" : "text-base"
						)}>ABUZAR</p>
						<p className={cn(
							"text-gray-500 -mt-1 transition-all duration-300",
							isScrolled ? "text-xs" : "text-xs"
						)}>INDUSTRIES</p>
					</div>
				</a>
				<div className="hidden items-center gap-1 lg:flex">
					{links.map((link) => (
						<a
							key={link.href}
							className={cn(
								buttonVariants({ variant: 'ghost', size: 'sm' }),
								"transition-all duration-300 hover:scale-105"
							)}
							href={link.href}
						>
							{link.label}
						</a>
					))}
				</div>
				<div className="flex items-center gap-2">
					<Button 
						asChild
						size="sm" 
						className={cn(
							"bg-gradient-to-r from-accent to-yellow-500 text-gray-900 hover:from-yellow-500 hover:to-accent font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg rounded-full",
							isScrolled ? "px-4 py-2" : "px-5 py-2.5"
						)}
					>
						<a href="/calculator">Calculator</a>
					</Button>
					<Sheet open={open} onOpenChange={setOpen}>
						<Button
							size="icon"
							variant="outline"
							onClick={() => setOpen(!open)}
							className="lg:hidden"
						>
							<MenuIcon className="size-4" />
						</Button>
						<SheetContent
							className="bg-white/95 supports-[backdrop-filter]:bg-white/80 gap-0 backdrop-blur-lg"
							showClose={false}
							side="left"
						>
							<div className="grid gap-y-2 overflow-y-auto px-4 pt-12 pb-5">
								{links.map((link) => (
									<a
										key={link.href}
										className={buttonVariants({
											variant: 'ghost',
											className: 'justify-start',
										})}
										href={link.href}
									>
										{link.label}
									</a>
								))}
							</div>
							<SheetFooter>
								<Button variant="outline">Contact Us</Button>
								<Button asChild className="bg-gradient-to-r from-accent to-yellow-500 text-gray-900 hover:from-yellow-500 hover:to-accent rounded-full">
									<a href="/calculator">Calculator</a>
								</Button>
							</SheetFooter>
						</SheetContent>
					</Sheet>
				</div>
			</nav>
		</header>
	);
}