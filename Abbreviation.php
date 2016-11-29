<?php

namespace ProcessWire;

/**
 * Abbreviation
 *
 * Entity for ProcessWire Plugin 'Abbreviate'
 *
 * Sven Schüring <ssch@zenmotion.de>
 * http://www.zenmotion.de
 */
class Abbreviation implements \JsonSerializable
{
    /**
     * id
     * @var integer
     */
    protected $id;

    /**
     * text
     * @var string
     */
    protected $text;

    /**
     * title
     * @var string
     */
    protected $title;

    /**
     * language
     * @var string
     */
    protected $language;

    /**
     * return the id of abbreviation
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * return the abbreviation
     * @return string
     */
    public function getText()
    {
        return $this->text;
    }

    /**
     * returns the title of abbreviation
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * return the language of abbreviation
     * @return string language code based on IETF language tag
     */
    public function getLanguage()
    {
        return $this->language;
    }

    /**
     * set the id of abbreviation
     * @param integer $id
     */
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

    /**
     * set the abbreviation
     * @param string $text
     */
    public function setText($text)
    {
        $this->text = $text;

        return $this;
    }

    /**
     * set the title of abbreviation
     * @param string $title
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * set the language of abbreviation
     * @param string $language language code based on IETF language tag
     */
    public function setLanguage($language)
    {
        $this->language = $language;

        return $this;
    }

    /**
     * string representation of the abbreviation as HTML
     * @return string
     */
    public function __toString()
    {
        $lang = $this->language ? ' lang="'. $this->language .'"' : '';

        return '<abbr'. $lang .' title="'. $this->title .'">'. $this->text .'</abbr>';
    }

    /**
     * JSON representation of this class
     * @return array
     */
    public function jsonSerialize()
    {
        return [
            'text'  => $this->getText(),
            'title' => $this->getTitle(),
            'lang'  => $this->getLanguage(),
        ];
    }
}
