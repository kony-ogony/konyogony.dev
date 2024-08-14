use wasm_bindgen::{prelude::*, JsCast};
use web_sys::{Event, HtmlElement, Node};
use yew::{classes, function_component, html, use_effect, use_state, Callback, Html, MouseEvent};
use yew_icons::{Icon, IconId};

use crate::components::navbar::nav_items::{DiscordNav, HomeNav, NotesNav, TitleHome};
use crate::utils::openlink::open_link;

#[function_component(Navbar)]
pub fn navbar() -> Html {
    let is_open = use_state(|| false);

    // Toggle the dropdown menu
    let toggle_dropdown: Callback<MouseEvent> = {
        let is_open = is_open.clone();
        Callback::from(move |_| is_open.set(!*is_open))
    };

    // Handle clicks outside of the dropdown to close it
    {
        let is_open = is_open.clone();
        use_effect(move || {
            let on_click = Closure::wrap(Box::new(move |event: Event| {
                if let Some(target) = event.target() {
                    if let Ok(target) = target.dyn_into::<HtmlElement>() {
                        if let Some(document) = web_sys::window().and_then(|win| win.document()) {
                            if let Ok(Some(dropdown)) = document.query_selector(".dropdown-menu") {
                                if let Ok(dropdown) = dropdown.dyn_into::<Node>() {
                                    if !dropdown.contains(Some(&target)) {
                                        is_open.set(false);
                                    }
                                }
                            } else {
                                is_open.set(false);
                            }
                        }
                    }
                }
            }) as Box<dyn FnMut(_)>);

            let window = web_sys::window().expect("No window available");
            window
                .add_event_listener_with_callback("click", on_click.as_ref().unchecked_ref())
                .expect("Failed to add event listener");

            // Cleanup function to remove event listener
            move || {
                window
                    .remove_event_listener_with_callback("click", on_click.as_ref().unchecked_ref())
                    .expect("Failed to remove event listener");
            }
        });
    }

    // Close dropdown menu when an item is clicked
    let close_dropdown: Callback<MouseEvent> = {
        let is_open = is_open.clone();
        Callback::from(move |e: MouseEvent| {
            e.stop_propagation();
            is_open.set(false);
        })
    };

    html!(
        <div class="w-full bg-gray-500/15 flex z-40 flex-row items-center px-[24rem] py-4 gap-1 backdrop-blur-lg border-b border-white/5 sticky top-0">
            <TitleHome />
            <div class="ml-auto flex flex-row gap-8 items-center text-base font-semibold">
                <HomeNav />
                <div class="relative dropdown-menu">
                    <button onclick={toggle_dropdown} class="cursor-pointer hover:text-blue-500/80 transition-all duration-150 flex flex-row gap-1 items-center">
                        <span>{"Projects"}</span>
                        <Icon
                            icon_id={IconId::FeatherChevronDown}
                            class={classes!(
                                "size-4",
                                "transition-transform",
                                "duration-150",
                                if *is_open { "rotate-180" } else { "rotate-0" }
                            )}
                        />
                    </button>
                    {
                        if *is_open {
                            html! {
                                <div class="absolute z-20 left-1/2 -translate-x-1/2 mt-2 gap-2 min-w-24 bg-gray-700/75 p-2 rounded-md backdrop-blur-xl grid grid-cols-1 border border-white/5">
                                    <div onclick={close_dropdown.clone()}><DiscordNav /></div>
                                    <div onclick={close_dropdown.clone()}><NotesNav /></div>
                                </div>
                            }
                        } else {
                            html! { <></> }
                        }
                    }
                </div>
                <div class="w-[1.5px] rounded-md h-5 bg-white/5" />
                <Icon
                    icon_id={IconId::BootstrapDiscord}
                    onclick={Callback::from(|_: MouseEvent| { open_link("https://discord.com/users/564472732071493633") })}
                    class="cursor-pointer hover:text-blue-500/80 transition-all duration-150"
                />
                <Icon
                    icon_id={IconId::BootstrapGithub}
                    onclick={Callback::from(|_: MouseEvent| { open_link("https://github.com/kony-ogony") })}
                    class="cursor-pointer hover:text-blue-500/80 transition-all duration-150"
                />
            </div>
        </div>
    )
}
