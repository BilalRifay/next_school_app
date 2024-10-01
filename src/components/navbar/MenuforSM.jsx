import { Button } from '@/components/ui/button';
import * as Accordion from '@radix-ui/react-accordion';
import * as Dialog from '@radix-ui/react-dialog';
import { ChevronDown, LogInIcon, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from "../context/authContext"
import LanguageSelector from '@/LanguageSelecter/LanguageSelector';
import ProfilePage from '@/AuthPages/ProfilePage';

const MenuforSM = ({ sections = [] }) => {
  const { user } = useAuth();

  return (
      <Dialog.Root>
          <Dialog.Trigger asChild>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 block md:hidden bg-transparent">
                  <Menu />
              </Button>
          </Dialog.Trigger>
          <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/50" />
              <Dialog.Content className="fixed right-0 top-0 h-full w-[300px] max-w-md bg-background p-6 shadow-lg focus:outline-none">
                  <div className="flex flex-col h-full">
                      <div className="flex justify-between items-center mb-4">
                          <Dialog.Title className="text-lg font-semibold">School Navigation</Dialog.Title>
                          <Dialog.Close asChild>
                              <button className="rounded-full opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
                                  <X className="h-4 w-4" />
                                  <span className="sr-only">Close</span>
                              </button>
                          </Dialog.Close>
                      </div>
                      <Dialog.Description className="text-sm text-muted-foreground mb-4">
                          Explore our schools various sections and resources.
                      </Dialog.Description>
                      <div className="flex flex-col gap-3 mb-4">
                          <LanguageSelector />
                          {user ? (
                              <ProfilePage />
                          ) : (
                              <Link to="/auth">
                                  <Button className='bg-transparent text-black'>
                                      <LogInIcon className='text-black me-5' />
                                      Login
                                  </Button>
                              </Link>
                          )}
                      </div>
                      <div className="flex-grow overflow-auto">
                          <Accordion.Root type="single" collapsible className="w-full">
                              {sections.map((section, index) => (
                                  <Accordion.Item value={`item-${index}`} key={index}>
                                      <div className="flex w-full items-center justify-between py-4 text-lg font-semibold">
                                          <Dialog.Close asChild>
                                              <Link to={section.links ? section.links[0] : '#'} className="flex-grow text-left hover:underline">
                                                  {section.title}
                                              </Link>
                                          </Dialog.Close>
                                          <Accordion.Trigger>
                                              <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                                          </Accordion.Trigger>
                                      </div>
                                      <Accordion.Content className="overflow-hidden text-sm transition-all">
                                          <div className="flex flex-col space-y-2 py-4">
                                              {section.items && section.items.map((item, itemIndex) => (
                                                  <Button key={itemIndex} className="justify-start text-left hover:bg-accent hover:text-accent-foreground">
                                                      <Dialog.Close asChild>
                                                          <Link to={section.links ? section.links[itemIndex] : '#'}>{item}</Link>
                                                      </Dialog.Close>
                                                  </Button>
                                              ))}
                                          </div>
                                      </Accordion.Content>
                                  </Accordion.Item>
                              ))}
                          </Accordion.Root>
                      </div>
                  </div>
              </Dialog.Content>
          </Dialog.Portal>
      </Dialog.Root>
  );
};


export default MenuforSM;