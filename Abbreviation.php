<?php

/**
 * Abbreviation
 *
 * Entity for ProcessWire Plugin Abbreviate
 *
 * Sven Schüring <ssch@zenmotion.de>
 * http://www.zenmotion.de
 */
class Abbreviation implements JsonSerializable
{

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

    public function jsonSerialize()
    {
        return [
            'text'  => $this->getText(),
            'title' => $this->getTitle()
        ];
    }
}
